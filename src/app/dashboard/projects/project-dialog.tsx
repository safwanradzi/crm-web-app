
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createProjectAction, updateProjectAction } from './actions'
import { Client } from '@/types'
import { Plus, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProjectDialogProps {
    clients: Client[]
    project?: any
}

export function ProjectDialog({ clients, project }: ProjectDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        let result
        if (project) {
            formData.append('id', project.id)
            result = await updateProjectAction(formData)
        } else {
            result = await createProjectAction(formData)
        }

        setLoading(false)

        if (result.error) {
            alert(result.error)
        } else {
            setOpen(false)
            router.refresh()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {project ? (
                    <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                    <DialogDescription>
                        {project ? 'Update project details.' : 'Create a new website project for a client.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="client_id">Client</Label>
                                <Select name="client_id" required defaultValue={project?.client_id}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map(client => (
                                            <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select name="status" defaultValue={project?.status || 'lead'}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lead">Lead</SelectItem>
                                        <SelectItem value="negotiation">Negotiation</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Aiman Property Website"
                                required
                                defaultValue={project?.name}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                name="url"
                                placeholder="https://..."
                                defaultValue={project?.url}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="stack">Stack</Label>
                                <Select name="stack" defaultValue={project?.stack}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select stack" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="wordpress">WordPress</SelectItem>
                                        <SelectItem value="nextjs">Next.js</SelectItem>
                                        <SelectItem value="shopify">Shopify</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="base_price">Price (RM)</Label>
                                <Input
                                    id="base_price"
                                    name="base_price"
                                    type="number"
                                    placeholder="0.00"
                                    defaultValue={project?.base_price}
                                />
                            </div>
                        </div>

                        {/* New Domain Fields */}
                        <div className="grid gap-2 border-t pt-4 mt-2">
                            <Label className="text-base font-semibold">Domain Details</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="domain_purchase_date">Purchase Date</Label>
                                    <Input id="domain_purchase_date" name="domain_purchase_date" type="date" defaultValue={project?.domain_purchase_date} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="domain_expiry_date">Expiry Date</Label>
                                    <Input id="domain_expiry_date" name="domain_expiry_date" type="date" defaultValue={project?.domain_expiry_date} />
                                </div>
                            </div>
                        </div>

                        {/* New Login Fields */}
                        <div className="grid gap-2 border-t pt-4 mt-2">
                            <Label className="text-base font-semibold">Website Login Details</Label>
                            <div className="grid gap-2">
                                <Label htmlFor="website_login_url">Login URL</Label>
                                <Input id="website_login_url" name="website_login_url" placeholder="https://example.com/wp-admin" defaultValue={project?.website_login_url} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="website_login_username">Username</Label>
                                    <Input id="website_login_username" name="website_login_username" defaultValue={project?.website_login_username} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="website_login_password">Password</Label>
                                    <Input id="website_login_password" name="website_login_password" type="text" defaultValue={project?.website_login_password} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : (project ? 'Update Project' : 'Save Project')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
