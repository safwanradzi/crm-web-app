import { getClientProjects, getClientInvoices } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PortalDashboard() {
    const projects = await getClientProjects()
    const invoices = await getClientInvoices()

    const unpaidInvoices = invoices.filter((i: any) => i.status !== 'paid')

    return (
        <div className="grid gap-4 md:gap-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Active Projects</CardDescription>
                        <CardTitle className="text-4xl">{projects.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            In progress
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Unpaid Invoices</CardDescription>
                        <CardTitle className="text-4xl">{unpaidInvoices.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Action required
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Recent Projects</CardTitle>
                            <CardDescription>
                                Your ongoing website projects.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/portal/projects">
                                View All
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {projects.length > 0 ? (
                            <div className="grid gap-4">
                                {projects.slice(0, 5).map((project: any) => (
                                    <div key={project.id} className="flex items-center gap-4 rounded-lg border p-4">
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">{project.name}</p>
                                            <p className="text-sm text-muted-foreground">{project.url || 'No URL'}</p>
                                        </div>
                                        <div className="ml-auto font-medium">
                                            <Badge variant="outline">{project.status}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No projects found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
