import { getClients } from './actions'
import { ClientDialog } from './client-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { deleteClientAction } from './actions'
import { ClientActionsMenu } from './client-actions-menu'
import { PaginationControls } from '@/components/ui/pagination-controls'

export default async function ClientsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1
    const limit = 10
    const { data: clients, totalCount } = await getClients(page, limit)
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Clients</h1>
                <ClientDialog />
            </div>
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>Client List</CardTitle>
                    <CardDescription>
                        Manage your clients and prospects.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Company</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Contact</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell>
                                        <div className="font-medium">{client.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {client.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {client.company_name || '-'}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant={client.status === 'active' ? 'default' : 'secondary'}>
                                            {client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {client.phone || '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ClientActionsMenu client={client} />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {clients.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No clients found. Add one to get started.
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
