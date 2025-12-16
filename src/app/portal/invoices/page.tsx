import { getClientInvoices } from '../actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

export default async function ClientInvoicesPage() {
    const invoices = await getClientInvoices()

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>My Invoices</CardTitle>
                <CardDescription>
                    View and download your invoices.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead className="hidden sm:table-cell">Project</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Due Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">View</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice: any) => (
                            <TableRow key={invoice.id}>
                                <TableCell>
                                    <div className="font-medium">{invoice.invoice_number}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {invoice.projects?.name || '-'}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant={invoice.status === 'paid' ? 'default' : (invoice.status === 'overdue' ? 'destructive' : 'secondary')}>
                                        {invoice.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : '-'}
                                </TableCell>
                                <TableCell className="text-right">
                                    RM {invoice.total?.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/portal/invoices/${invoice.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
