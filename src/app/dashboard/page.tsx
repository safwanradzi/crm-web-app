
import { getDashboardStats } from './actions'
import { OverviewChart } from './overview-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowUpRight, DollarSign, Users, CreditCard, Activity } from 'lucide-react'

import { DashboardFilter } from './dashboard-filter'

export default async function DashboardPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams
    const month = typeof searchParams.month === 'string' ? searchParams.month : undefined
    const year = typeof searchParams.year === 'string' ? searchParams.year : undefined

    const stats = await getDashboardStats({ month, year })

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Overview</h2>
                <DashboardFilter />
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"> Total Revenue </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">RM {stats.totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground"> Based on paid invoices </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"> Total Sales </CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">RM {stats.totalSales.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground"> Total Value of Projects </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"> Expenses </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">RM {stats.totalExpenses.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground"> Total recorded expenses </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"> Net Profit </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${stats.netProfit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            RM {stats.netProfit.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground"> Revenue - Expenses </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProjects}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{stats.activeProjects}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completed Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.completedProjects}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalClients}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>
                                Monthly revenue vs expenses (Last 6 Months).
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <OverviewChart data={stats.monthlyData} />
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                        <CardTitle>Recent Invoices</CardTitle>
                        <CardDescription> Latest 5 invoices generated </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.recentInvoices.map((inv: any) => (
                                    <TableRow key={inv.id}>
                                        <TableCell>
                                            <div className="font-medium">{inv.clients?.name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {inv.invoice_number}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="font-medium">RM {inv.total?.toFixed(2)}</div>
                                            <Badge variant="outline" className="text-xs">{inv.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex justify-center pt-4">
                            <Link href="/dashboard/invoices">
                                <Button variant="ghost" size="sm" className="gap-1">
                                    View All Invoices <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Renewals</CardTitle>
                    <CardDescription>Domains expiring in the next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Domain</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead className="text-right">Provider</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.renewals.map((r: any) => (
                                <TableRow key={r.id}>
                                    <TableCell className="font-medium">{r.domain_name}</TableCell>
                                    <TableCell>{r.projects?.name}</TableCell>
                                    <TableCell>{r.domain_expiry_date}</TableCell>
                                    <TableCell className="text-right">{r.domain_registrar}</TableCell>
                                </TableRow>
                            ))}
                            {stats.renewals.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                        No upcoming renewals found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
