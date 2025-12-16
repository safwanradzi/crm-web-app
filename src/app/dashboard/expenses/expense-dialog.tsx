
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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createExpenseAction } from './actions'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ExpenseDialogProps {
    projects: any[]
}

export function ExpenseDialog({ projects }: ExpenseDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isRecurring, setIsRecurring] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        // Checkbox 'on' value handling is automatic with FormData if name matches, but state helps UI
        const result = await createExpenseAction(formData)

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
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Record Expense</DialogTitle>
                    <DialogDescription>
                        Log a business expense.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <div className="col-span-3">
                                <Select name="category" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hosting_server">Hosting/Server</SelectItem>
                                        <SelectItem value="domain_purchase">Domain Purchase</SelectItem>
                                        <SelectItem value="plugin_license">Plugin License</SelectItem>
                                        <SelectItem value="software_subscription">Software Subscription</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="office">Office</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Input id="description" name="description" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">Amount</Label>
                            <Input id="amount" name="amount" type="number" step="0.01" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Date</Label>
                            <Input id="date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project_id" className="text-right">Project (Opt)</Label>
                            <div className="col-span-3">
                                <Select name="project_id">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Link to Project (Optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="null">None</SelectItem>
                                        {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-start-2 col-span-3 flex items-center space-x-2">
                                <Checkbox id="is_recurring" name="is_recurring" onCheckedChange={(c) => setIsRecurring(c === true)} />
                                <label
                                    htmlFor="is_recurring"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Recurring Expense?
                                </label>
                            </div>
                        </div>
                        {isRecurring && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="recurring_interval" className="text-right">Interval</Label>
                                <div className="col-span-3">
                                    <Select name="recurring_interval">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Interval" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Expense'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
