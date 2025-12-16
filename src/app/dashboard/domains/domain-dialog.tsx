
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
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createDomainAction, updateDomainAction } from './actions'
import { Plus, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DomainDialogProps {
    projects: any[]
    domain?: any
}

export function DomainDialog({ projects, domain }: DomainDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        let result
        if (domain) {
            formData.append('id', domain.id)
            result = await updateDomainAction(formData)
        } else {
            result = await createDomainAction(formData)
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
                {domain ? (
                    <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Domain/Hosting
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Track Domain & Hosting</DialogTitle>
                    <DialogDescription>
                        Record purchase and expiry dates for a project.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4 h-[400px] overflow-y-auto pr-2">

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project_id" className="text-right">
                                Project
                            </Label>
                            <div className="col-span-3">
                                <Select name="project_id" required defaultValue={domain?.project_id}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map(project => (
                                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* DOMAIN SECTION */}
                        <div className="relative px-4 py-2 border rounded bg-slate-50 col-span-4">
                            <span className="absolute -top-2 left-2 bg-slate-50 px-1 text-xs font-bold text-slate-500">DOMAIN</span>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="domain_name" className="text-right">Name</Label>
                                    <Input id="domain_name" name="domain_name" placeholder="example.com" className="col-span-3" defaultValue={domain?.domain_name} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="domain_registrar" className="text-right">Registrar</Label>
                                    <Input id="domain_registrar" name="domain_registrar" placeholder="e.g. Namecheap" className="col-span-3" defaultValue={domain?.domain_registrar} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="domain_purchase_date" className="text-right">Bought</Label>
                                    <Input id="domain_purchase_date" name="domain_purchase_date" type="date" className="col-span-3" defaultValue={domain?.domain_purchase_date} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="domain_expiry_date" className="text-right">Expires</Label>
                                    <Input id="domain_expiry_date" name="domain_expiry_date" type="date" className="col-span-3" defaultValue={domain?.domain_expiry_date} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="domain_cost" className="text-right">Cost (RM)/yr</Label>
                                    <Input id="domain_cost" name="domain_cost" type="number" step="0.01" className="col-span-3" defaultValue={domain?.domain_cost} />
                                </div>
                            </div>
                        </div>

                        {/* HOSTING SECTION */}
                        <div className="relative px-4 py-2 border rounded bg-slate-50 col-span-4 mt-2">
                            <span className="absolute -top-2 left-2 bg-slate-50 px-1 text-xs font-bold text-slate-500">HOSTING</span>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="hosting_provider" className="text-right">Provider</Label>
                                    <Input id="hosting_provider" name="hosting_provider" placeholder="e.g. Exabytes" className="col-span-3" defaultValue={domain?.hosting_provider} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="hosting_plan" className="text-right">Plan</Label>
                                    <Input id="hosting_plan" name="hosting_plan" placeholder="e.g. VPS Starter" className="col-span-3" defaultValue={domain?.hosting_plan} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="hosting_purchase_date" className="text-right">Bought</Label>
                                    <Input id="hosting_purchase_date" name="hosting_purchase_date" type="date" className="col-span-3" defaultValue={domain?.hosting_purchase_date} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="hosting_expiry_date" className="text-right">Expires</Label>
                                    <Input id="hosting_expiry_date" name="hosting_expiry_date" type="date" className="col-span-3" defaultValue={domain?.hosting_expiry_date} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="hosting_cost" className="text-right">Cost (RM)/yr</Label>
                                    <Input id="hosting_cost" name="hosting_cost" type="number" step="0.01" className="col-span-3" defaultValue={domain?.hosting_cost} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="login_note" className="text-right">
                                Login Hint
                            </Label>
                            <Textarea
                                id="login_note"
                                name="login_note"
                                placeholder="Hint for login location or username (No full passwords!)"
                                className="col-span-3"
                                defaultValue={domain?.login_note}
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : (domain ? 'Update Record' : 'Save Record')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
