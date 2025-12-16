
'use server'

import { createClient } from '@/utils/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()

    // 1. Total Revenue (Sum of 'paid' invoices)
    const { data: paidInvoices, error: invoiceError } = await supabase
        .from('invoices')
        .select('total, date')
        .eq('status', 'paid')

    const totalRevenue = paidInvoices?.reduce((sum, inv) => sum + (inv.total || 0), 0) || 0

    // 2. Total Expenses
    const { data: expenses, error: expenseError } = await supabase
        .from('expenses')
        .select('amount, date')

    const totalExpenses = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0

    // 3. Active Projects
    const { count: activeProjects, error: projectError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'in_progress')

    // 4. Recent Invoices (Limit 5)
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

    // 6. Monthly Data for Charts (Last 6 Months)
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
