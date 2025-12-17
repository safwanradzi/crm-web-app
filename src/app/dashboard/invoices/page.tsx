import { getInvoices } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { PaginationControls } from '@/components/ui/pagination-controls'

export const dynamic = 'force-dynamic'

export default async function InvoicesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const page = typeof params?.page === 'string' ? Number(params.page) : 1
    const limit = 10
    const { data: invoices, totalCount } = await getInvoices(page, limit)
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-4" key={page}>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Invoices</h1>
                <Link href="/dashboard/invoices/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Invoice
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>
                        Manage your billing and payments.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead className="hidden sm:table-cell">Date</TableHead>
                                <TableHead className="hidden md:table-cell">Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((inv) => (
                                <TableRow key={inv.id}>
                                    <TableCell className="font-medium">
                                        {inv.invoice_number}
                                    </TableCell>
                                    <TableCell>
                                        {inv.clients?.name}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {inv.date}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge variant={inv.status === 'paid' ? 'default' : inv.status === 'overdue' ? 'destructive' : 'secondary'}>
                                            {inv.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                        {inv.total?.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/dashboard/invoices/${inv.id}`}>
                                            <Button size="sm" variant="ghost">View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {invoices.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No invoices found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="mt-4">
                        <PaginationControls
                            hasNextPage={page < totalPages}
                            hasPrevPage={page > 1}
                            totalCount={totalCount}
                            totalPages={totalPages}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
