import { getLeads, updateLeadStatusAction, deleteLeadAction } from './actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trash2, Phone, Mail, MessageSquare, CheckCircle, Archive, UserCheck } from 'lucide-react'
import { PaginationControls } from '@/components/ui/pagination-controls'

export const dynamic = 'force-dynamic'

export default async function LeadsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const page = typeof params?.page === 'string' ? Number(params.page) : 1
    const limit = 10
    const { data: leads, totalCount } = await getLeads(page, limit)
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-6" key={page}>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Leads & Inquiries</h1>
                <p className="text-muted-foreground">Manage potential clients from your website contact form.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Service Interest</TableHead>
                                <TableHead>Message / Contact</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                        No leads found yet. Check your website contact form!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                leads.map((lead: any) => (
                                    <TableRow key={lead.id}>
                                        <TableCell>
                                            <Badge variant={
                                                lead.status === 'new' ? 'default' :
                                                    lead.status === 'converted' ? 'secondary' : // Using secondary (greenish usually) or outline
                                                        lead.status === 'contacted' ? 'outline' : 'destructive'
                                            } className={
                                                lead.status === 'new' ? 'bg-blue-600 hover:bg-blue-700' :
                                                    lead.status === 'converted' ? 'bg-green-600 hover:bg-green-700 text-white' : ''
                                            }>
                                                {lead.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {lead.name}
                                            <div className="flex gap-2 mt-1">
                                                {lead.email && (
                                                    <a href={`mailto:${lead.email}`} className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                                                        <Mail className="h-3 w-3" /> Email
                                                    </a>
                                                )}
                                                {lead.phone && (
                                                    <a href={`tel:${lead.phone}`} className="text-xs text-green-600 flex items-center gap-1 hover:underline">
                                                        <Phone className="h-3 w-3" /> Call
                                                    </a>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {lead.service_interest === 'landing' && 'Landing Page'}
                                            {lead.service_interest === 'corporate' && 'Corporate Website'}
                                            {lead.service_interest === 'ecommerce' && 'E-Commerce Store'}
                                            {lead.service_interest === 'custom' && 'Custom Project'}
                                            {!['landing', 'corporate', 'ecommerce', 'custom'].includes(lead.service_interest) && lead.service_interest}
                                        </TableCell>
                                        <TableCell className="max-w-[300px]">
                                            <div className="text-sm line-clamp-2" title={lead.message}>
                                                {lead.message}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {/* Status Actions */}
                                                {lead.status === 'new' && (
                                                    <form action={async () => {
                                                        'use server'
                                                        await updateLeadStatusAction(lead.id, 'contacted')
                                                    }}>
                                                        <Button size="icon" variant="outline" title="Mark as Contacted">
                                                            <MessageSquare className="h-4 w-4 text-blue-600" />
                                                        </Button>
                                                    </form>
                                                )}
                                                {lead.status === 'contacted' && (
                                                    <form action={async () => {
                                                        'use server'
                                                        await updateLeadStatusAction(lead.id, 'converted')
                                                    }}>
                                                        <Button size="icon" variant="outline" title="Mark as Converted">
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        </Button>
                                                    </form>
                                                )}

                                                <form action={async () => {
                                                    'use server'
                                                    await deleteLeadAction(lead.id)
                                                }}>
                                                    <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
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
