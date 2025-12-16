
import { getDomains } from './actions'
import { getProjects } from '../projects/actions'
import { DomainDialog } from './domain-dialog'
import { DeleteDomainButton } from './delete-domain-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { differenceInDays, parseISO } from 'date-fns'

export default async function DomainsPage() {
    const domains = await getDomains()
    const projects = await getProjects()

    const getStatusBadge = (expiryDate: string | null) => {
        if (!expiryDate) return <Badge variant="secondary">No Date</Badge>
        const daysLeft = differenceInDays(parseISO(expiryDate), new Date())

        if (daysLeft < 0) return <Badge variant="destructive">Expired</Badge>
        if (daysLeft < 30) return <Badge className="bg-orange-500 hover:bg-orange-600">Expiring Soon ({daysLeft} days)</Badge>
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active ({daysLeft} days)</Badge>
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Domains & Hosting</h1>
                <DomainDialog projects={projects} />
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Assets Tracking</CardTitle>
                    <CardDescription>
                        Monitor renewal dates for domains and hosting.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Asset</TableHead>
                                <TableHead className="hidden sm:table-cell">Project</TableHead>
                                <TableHead className="hidden sm:table-cell">Provider</TableHead>
                                <TableHead>Expiry Status</TableHead>
                                <TableHead className="hidden md:table-cell text-right">Cost</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {domains.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.domain_name && (
                                            <div className="font-medium flex flex-col">
                                                <span>{item.domain_name}</span>
                                                <span className="text-xs text-muted-foreground">Domain</span>
                                            </div>
                                        )}
                                        {item.hosting_plan && (
                                            <div className="font-medium flex flex-col mt-1">
                                                <span>{item.hosting_plan}</span>
                                                <span className="text-xs text-muted-foreground">Hosting</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {item.projects?.name}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-sm">
                                        {item.domain_registrar && <div>{item.domain_registrar} <span className="text-xs text-muted-foreground">(Reg)</span></div>}
                                        {item.hosting_provider && <div>{item.hosting_provider} <span className="text-xs text-muted-foreground">(Host)</span></div>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {item.domain_expiry_date && getStatusBadge(item.domain_expiry_date)}
                                            {item.hosting_expiry_date && getStatusBadge(item.hosting_expiry_date)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right">
                                        <div className="flex flex-col">
                                            {item.domain_cost && <span>RM {item.domain_cost}</span>}
                                            {item.hosting_cost && <span>RM {item.hosting_cost}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <DomainDialog projects={projects} domain={item} />
                                            <DeleteDomainButton id={item.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
