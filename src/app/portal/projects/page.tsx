import { getClientProjects } from '../actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProjectDetailsDialog } from './project-details-dialog'

export default async function ClientProjectsPage() {
    const projects = await getClientProjects()

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>My Projects</CardTitle>
                <CardDescription>
                    List of all your website projects.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead className="hidden sm:table-cell">URL</TableHead>
                            <TableHead className="hidden sm:table-cell">Stack</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project: any) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <div className="font-medium">{project.name}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {project.url ? (
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {project.url}
                                        </a>
                                    ) : '-'}
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
                                    <ProjectDetailsDialog project={project} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
