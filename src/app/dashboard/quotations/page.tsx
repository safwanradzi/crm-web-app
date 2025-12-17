import { getQuotations } from "./actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaginationControls } from "@/components/ui/pagination-controls"

export const dynamic = 'force-dynamic'

export default async function QuotationsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1
    const limit = 10
    const { data: quotations, totalCount } = await getQuotations(page, limit)
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-6" key={page}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quotations</h1>
                    <p className="text-muted-foreground">
                        Manage your sales quotations.
                    </p>
                </div>
                <Link href="/dashboard/quotations/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Quotation
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Quotations</CardTitle>
                    <CardDescription>
                        A list of all quotations generated.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Number</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quotations?.map((quote: any) => (
                                <TableRow key={quote.id}>
                                    <TableCell>{quote.date}</TableCell>
                                    <TableCell className="font-medium">{quote.quote_number}</TableCell>
                                    <TableCell>{quote.clients?.name}</TableCell>
                                    <TableCell>{quote.projects?.name || '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">{quote.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/dashboard/quotations/${quote.id}`}>
                                            <Button variant="ghost" size="sm">View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {quotations?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No quotations found. Create your first one.
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
