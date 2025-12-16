
'use server'

import { createClient } from '@/utils/supabase/server'

export async function getDashboardStats({ month, year }: { month?: string, year?: string } = {}) {
    const supabase = await createClient()

    let startDate, endDate

    if (month && year) {
        // Create date range for the specific month
        const m = parseInt(month) - 1 // JS months are 0-indexed
        const y = parseInt(year)
        startDate = new Date(y, m, 1).toISOString()
        endDate = new Date(y, m + 1, 0, 23, 59, 59).toISOString()
    } else if (year) {
        // Create date range for the specific year
        const y = parseInt(year)
        startDate = new Date(y, 0, 1).toISOString()
        endDate = new Date(y, 11, 31, 23, 59, 59).toISOString()
    }

    // 1. Total Revenue (Sum of 'paid' invoices)
    let revenueQuery = supabase
        .from('invoices')
        .select('total, date')
        .eq('status', 'paid')

    if (startDate && endDate) {
        revenueQuery = revenueQuery.gte('date', startDate).lte('date', endDate)
    }

    const { data: paidInvoices, error: invoiceError } = await revenueQuery

    const totalRevenue = paidInvoices?.reduce((sum, inv) => sum + (inv.total || 0), 0) || 0

    // 2. Total Expenses
    let expenseQuery = supabase
        .from('expenses')
        .select('amount, date')

    if (startDate && endDate) {
        expenseQuery = expenseQuery.gte('date', startDate).lte('date', endDate)
    }

    const { data: expenses, error: expenseError } = await expenseQuery

    const totalExpenses = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0

    // 3. Active Projects
    const { count: activeProjects, error: projectError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'in_progress')

    // 4. Recent Invoices (Limit 5)
    // Note: Recent invoices might technically be outside the "filter" range if we just want "Recent", 
    // but usually "Recent" means recent overall. We will keep this top 5 overall.
    const { data: recentInvoices } = await supabase
        .from('invoices')
        .select('*, clients(name)')
        .order('created_at', { ascending: false })
        .limit(5)

    // 5. Upcoming Domain Renewals (Next 30 days)
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    const { data: renewals } = await supabase
        .from('domains_hosting')
        .select('*, projects(name)')
        .gte('domain_expiry_date', today.toISOString())
        .lte('domain_expiry_date', thirtyDaysFromNow.toISOString())
        .order('domain_expiry_date', { ascending: true })

    // 6. Monthly Data for Charts (Last 6 Months from NOW, typically fixed range)
    // If a filter is applied (e.g. 2024), we might want to show that year's data. 
    // But simply retaining the "Last 6 Months" logic is safer to avoid breaking the chart logic 
    // unless we refactor the chart to handle variable ranges. 
    // For now, we keep the original chart logic (Last 6 Months relative to today) 
    // OR we could just let the chart show the filtered data if it matches.
    // Let's stick to the original Chart Logic to avoid complexity risks right before deployment.
    const monthlyDataMap = new Map<string, { name: string; revenue: number; expenses: number }>()

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
        const d = new Date()
        d.setMonth(d.getMonth() - i)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        const monthName = d.toLocaleString('default', { month: 'short' })
        monthlyDataMap.set(key, { name: monthName, revenue: 0, expenses: 0 })
    }

    // Aggregate Revenue
    paidInvoices?.forEach((inv: any) => {
        // Ensure date exists and is long enough
        if (inv.date && inv.date.length >= 7) {
            const date = inv.date.substring(0, 7) // YYYY-MM
            if (monthlyDataMap.has(date)) {
                monthlyDataMap.get(date)!.revenue += (inv.total || 0)
            }
        }
    })

    // Aggregate Expenses
    expenses?.forEach((exp: any) => {
        if (exp.date && exp.date.length >= 7) {
            const date = exp.date.substring(0, 7) // YYYY-MM
            if (monthlyDataMap.has(date)) {
                monthlyDataMap.get(date)!.expenses += (exp.amount || 0)
            }
        }
    })

    const monthlyData = Array.from(monthlyDataMap.values())

    return {
        totalRevenue,
        totalExpenses,
        netProfit: totalRevenue - totalExpenses,
        activeProjects: activeProjects || 0,
        recentInvoices: recentInvoices || [],
        renewals: renewals || [],
        monthlyData
    }
}
