
import { getProjects } from './actions'
import { getClients } from '../clients/actions'
import { ProjectDialog } from './project-dialog'
import { DeleteProjectButton } from './delete-project-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function ProjectsPage() {
    const projects = await getProjects()
    const clients = await getClients()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
                <ProjectDialog clients={clients} />
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Project List</CardTitle>
                    <CardDescription>
                        Manage your ongoing and completed projects.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Client</TableHead>
                                <TableHead className="hidden sm:table-cell">Stack</TableHead>
                                <TableHead className="hidden md:table-cell">Status</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="font-medium">{project.name}</div>
                                        {project.url && (
                                            <div className="hidden text-sm text-blue-500 md:inline">
                                                <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {project.clients?.name}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {project.stack}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge variant="outline">
                                            {project.status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        RM {project.base_price?.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/dashboard/projects/${project.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <ProjectDialog clients={clients} project={project} />
                                            <DeleteProjectButton id={project.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {projects.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No projects found.
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
