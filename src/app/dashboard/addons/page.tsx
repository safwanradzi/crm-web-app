
import { getAddons } from './actions'
import { getProjects } from '../projects/actions'
import { AddonDialog } from './addon-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default async function AddonsPage() {
    const addons = await getAddons()
    const projects = await getProjects()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Add-on Services</h1>
                <AddonDialog projects={projects} />
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Service Log</CardTitle>
                    <CardDescription>
                        Extra services and ad-hoc jobs.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="hidden sm:table-cell">Project</TableHead>
                                <TableHead>Note</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {addons.map((addon) => (
                                <TableRow key={addon.id}>
                                    <TableCell>
                                        {addon.date}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {addon.description}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {addon.projects?.name || '-'}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {addon.note}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        RM {addon.price?.toFixed(2)}
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
