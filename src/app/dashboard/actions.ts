
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

    // 6. Extended Metrics (Total Sales, Project Stats, Client Stats)

    // Total Sales (Project Value)
    const { data: allProjects, error: allProjError } = await supabase
        .from('projects')
        .select('base_price, status')

    const totalSales = allProjects?.reduce((sum, p) => sum + (p.base_price || 0), 0) || 0
    const totalProjects = allProjects?.length || 0
    const completedProjects = allProjects?.filter(p => p.status === 'completed').length || 0
    // Active Projects logic is already handled above (activeProjects var), 
    // but calculating from 'allProjects' saves a DB call if strict query above isn't needed separately. 
    // However, existing activeProjects query uses { count: 'exact' } which is efficient. 
    // We already fetched it, so we can keep it or replace logic.
    // Let's stick to using `allProjects` to derive counts to minimize queries if dataset is small, 
    // or keep separate queries if dataset is large. For now, separate is fine or shared.
    // Let's reuse 'allProjects' for consistency if possible, but the above 'activeProjects' query is count-only.

    // Total Clients
    const { count: totalClients } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })

    // 7. Monthly Data for Charts (Last 6 Months from NOW)
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
        monthlyData,
        // New Metric Returns
        totalSales,
        totalProjects,
        completedProjects,
        totalClients: totalClients || 0
    }
}

