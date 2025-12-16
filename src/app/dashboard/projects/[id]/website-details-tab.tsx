'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, Copy, ExternalLink, Globe } from 'lucide-react'

export function WebsiteDetailsTab({ project }: { project: any }) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Website & Domain Details
                </CardTitle>
                <CardDescription>Administrative details for the project's domain and login.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Domain Info */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-slate-50 p-4 rounded-lg border">
                    <div className="grid gap-1.5">
                        <Label className="text-xs text-muted-foreground">Domain Status</Label>
                        <div className="font-semibold">{project.url ? 'Active' : 'Pending'}</div>
                    </div>
                    <div className="grid gap-1.5">
                        <Label className="text-xs text-muted-foreground">Purchase Date</Label>
                        <div className="font-medium">{project.domain_purchase_date || '-'}</div>
                    </div>
                    <div className="grid gap-1.5">
                        <Label className="text-xs text-muted-foreground">Expiry Date</Label>
                        <div className={`font-medium ${project.domain_expiry_date ? 'text-red-600' : ''}`}>{project.domain_expiry_date || '-'}</div>
                    </div>
                </div>

                {/* Login Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Website Login Credentials</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="login_url">Login URL</Label>
                            <div className="flex items-center gap-2">
                                <Input id="login_url" value={project.website_login_url || ''} readOnly className="bg-white" />
                                {project.website_login_url && (
                                    <Button size="icon" variant="outline" onClick={() => window.open(project.website_login_url, '_blank')}>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                        {/* Spacer for grid if needed, or just let it flow */}
                        <div className="hidden md:block"></div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="flex items-center gap-2">
                                <Input id="username" value={project.website_login_username || ''} readOnly className="bg-white" />
                                <Button size="icon" variant="outline" onClick={() => copyToClipboard(project.website_login_username)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="flex items-center gap-2">
                                <Input id="password" value={project.website_login_password || ''} readOnly className="bg-white" />
                                <Button size="icon" variant="outline" onClick={() => copyToClipboard(project.website_login_password)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
