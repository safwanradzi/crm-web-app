import { getAddons } from './actions'
import { getProjects } from '../projects/actions'
import { AddonDialog } from './addon-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PaginationControls } from '@/components/ui/pagination-controls'

export const dynamic = 'force-dynamic'

export default async function AddonsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const page = typeof params?.page === 'string' ? Number(params.page) : 1
    const limit = 10
    const { data: addons, totalCount } = await getAddons(page, limit)
    // Fetch all projects for dropdowns
    const { data: allProjects } = await getProjects(1, 1000)

    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-4" key={page}>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Add-on Services</h1>
                <AddonDialog projects={allProjects} />
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
