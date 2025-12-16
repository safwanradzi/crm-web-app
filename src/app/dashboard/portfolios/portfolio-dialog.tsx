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
import { createPortfolioAction, updatePortfolioAction } from './actions'
import { PlusCircle, UploadCloud } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function PortfolioDialog({ portfolio, trigger }: { portfolio?: any, trigger?: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(event.currentTarget)

            let result
            if (portfolio) {
                result = await updatePortfolioAction(portfolio.id, formData)
            } else {
                result = await createPortfolioAction(formData)
            }

            if (result.error) {
                alert(result.error)
            } else {
                setOpen(false)
            }
        } catch (error) {
            console.error('Submission error:', error)
            alert('An unexpected error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Portfolio Unit
                        </span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{portfolio ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</DialogTitle>
                    <DialogDescription>
                        Showcase your best work. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="image">Project Image</Label>
                            <div className="flex items-center gap-4">
                                {portfolio?.image_url && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={portfolio.image_url} alt="Current" className="h-16 w-16 object-cover rounded border" />
                                )}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Input id="image" name="image" type="file" accept="image/*" />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input id="title" name="title" defaultValue={portfolio?.title} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select name="category" defaultValue={portfolio?.category}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                                    <SelectItem value="Corporate Website">Corporate Website</SelectItem>
                                    <SelectItem value="Ecommerce Website">Ecommerce Website</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="live_url">Live Website URL</Label>
                            <Input id="live_url" name="live_url" placeholder="https://..." defaultValue={portfolio?.live_url} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={portfolio?.description} placeholder="Brief details about the project..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? (portfolio ? 'Saving...' : 'Uploading...') : (portfolio ? 'Save Changes' : 'Create Item')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
