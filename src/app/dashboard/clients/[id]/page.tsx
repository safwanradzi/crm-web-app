
import { getClientById } from '../actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Building } from 'lucide-react'

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const client = await getClientById(id)

    if (!client) {
        return <div>Client not found</div>
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/clients">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">{client.name}</h1>
                <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                    {client.status}
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{client.company_name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${client.email}`} className="hover:underline">{client.email}</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{client.phone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{client.address || 'N/A'}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                            {client.notes || 'No notes available.'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Projects associated with this client.</CardDescription>
                </CardHeader>
                <CardContent>
                    {client.projects && client.projects.length > 0 ? (
                        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {client.projects.map((project: any) => (
                                <li key={project.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                    <Link href={`/dashboard/projects/${project.id}`} className="block h-full">
                                        <div className="font-semibold">{project.name}</div>
                                        <div className="text-sm text-muted-foreground mt-1 mb-2">{project.status.replace('_', ' ')}</div>
                                        <Badge variant="outline">{project.stack}</Badge>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No projects found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
