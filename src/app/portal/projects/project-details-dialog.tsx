'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Copy } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export function ProjectDetailsDialog({ project }: { project: any }) {
    const [open, setOpen] = useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    View Details
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{project.name} Details</DialogTitle>
                    <DialogDescription>
                        Domain and Login information for this project.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">

                    {/* Domain Info */}
                    <div className="space-y-4">
                        <h4 className="font-medium leading-none">Domain Status</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1.5">
                                <Label className="text-xs text-muted-foreground">Purchase Date</Label>
                                <div className="font-semibold">{project.domain_purchase_date || '-'}</div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label className="text-xs text-muted-foreground">Expiry Date</Label>
                                <div className="font-semibold text-red-600">{project.domain_expiry_date || '-'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 border-t pt-4">
                        <h4 className="font-medium leading-none">Website Login</h4>
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="login_url">Login URL</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="login_url" value={project.website_login_url || ''} readOnly className="bg-muted" />
                                    {project.website_login_url && (
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => window.open(project.website_login_url, '_blank')}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="username">Username</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="username" value={project.website_login_username || ''} readOnly className="bg-muted" />
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copyToClipboard(project.website_login_username)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="password">Password</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="password" value={project.website_login_password || ''} readOnly className="bg-muted" />
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copyToClipboard(project.website_login_password)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
