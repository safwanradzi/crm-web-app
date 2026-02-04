
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
import { createQuotationAction, updateQuotationAction } from './actions'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuotationFormProps {
    clients: any[]
    projects: any[]
    initialData?: any
    nextQuoteNumber?: string
}

export function QuotationForm({ clients, projects, nextQuoteNumber, initialData }: QuotationFormProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [selectedClient, setSelectedClient] = useState(initialData?.client_id || '')

    // Dynamic Lists
    const [scopeItems, setScopeItems] = useState<string[]>(initialData?.scope_of_work || [''])
    const [paymentTerms, setPaymentTerms] = useState<string[]>(initialData?.payment_terms || [
        '50% deposit upon confirmation.',
        '50% balance upon project completion.'
    ])

    // Line Items
    const [items, setItems] = useState(initialData?.items?.map((item: any) => ({
        description: item.description,
        qty: item.qty,
        unit_price: item.unit_price,
        line_total: item.qty * item.unit_price
    })) || [{ description: '', qty: 1, unit_price: 0, line_total: 0 }])

    // Handlers for Scope
    const addScope = () => setScopeItems([...scopeItems, ''])
    const removeScope = (i: number) => setScopeItems(scopeItems.filter((_: any, idx: number) => idx !== i))
    const updateScope = (i: number, val: string) => {
        const newScopes = [...scopeItems]
        newScopes[i] = val
        setScopeItems(newScopes)
    }

    // Handlers for Payment Terms
    const addTerm = () => setPaymentTerms([...paymentTerms, ''])
    const removeTerm = (i: number) => setPaymentTerms(paymentTerms.filter((_: any, idx: number) => idx !== i))
    const updateTerm = (i: number, val: string) => {
        const newTerms = [...paymentTerms]
        newTerms[i] = val
        setPaymentTerms(newTerms)
    }

    // Handlers for Items
    const addItem = () => setItems([...items, { description: '', qty: 1, unit_price: 0, line_total: 0 }])
    const removeItem = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i))
    const updateItem = (i: number, field: string, val: any) => {
        const newItems = [...items]
        // @ts-ignore
        newItems[i][field] = val
        if (field === 'qty' || field === 'unit_price') {
            newItems[i].line_total = newItems[i].qty * newItems[i].unit_price
        }
        setItems(newItems)
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)

        let result;
        if (initialData?.id) {
            result = await updateQuotationAction(initialData.id, formData, items, scopeItems, paymentTerms)
        } else {
            result = await createQuotationAction(formData, items, scopeItems, paymentTerms)
        }

        setLoading(false)

        if (result.error) {
            alert(result.error)
        } else {
            router.push('/dashboard/quotations')
            router.refresh()
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-5xl mx-auto pb-10">
            {/* Header Info */}
            <Card>
                <CardHeader><CardTitle>{initialData ? 'Edit Quotation' : 'New Quotation'}</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Client</Label>
                        <Select name="client_id" value={selectedClient} onValueChange={setSelectedClient} required>
                            <SelectTrigger><SelectValue placeholder="Select Client" /></SelectTrigger>
                            <SelectContent>
                                {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Project (Optional)</Label>
                        <Select name="project_id" defaultValue={initialData?.project_id || ''} disabled={!selectedClient}>
                            <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
                            <SelectContent>
                                {projects
                                    .filter(p => !selectedClient || p.client_id === selectedClient)
                                    .map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Quotation No</Label>
                        <Input name="quote_number" defaultValue={initialData?.quote_number || nextQuoteNumber} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Date</Label>
                        <Input name="date" type="date" defaultValue={initialData?.date || new Date().toISOString().split('T')[0]} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Valid Until</Label>
                        <Input name="valid_until" type="date" defaultValue={initialData?.valid_until || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select name="status" defaultValue={initialData?.status || 'draft'}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="sent">Sent</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Completion Timeframe</Label>
                        <Input name="completion_timeframe" defaultValue={initialData?.completion_timeframe || ''} placeholder="e.g. 5-7 working days" />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <Label>Notes</Label>
                        <Textarea name="notes" placeholder="Additional notes..." defaultValue={initialData?.notes || ''} />
                    </div>
                </CardContent>
            </Card>

            {/* Scope of Work */}
            <Card>
                <CardHeader>
                    <CardTitle>Scope of Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {scopeItems.map((scope: string, index: number) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                value={scope}
                                onChange={(e) => updateScope(index, e.target.value)}
                                placeholder="e.g. Responsive Design (Mobile & Desktop)"
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeScope(index)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addScope} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" /> Add Scope Item
                    </Button>
                </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
                <CardHeader><CardTitle>Items & Cost</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {items.map((item: any, index: number) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-6">
                                <Label className="text-xs">Description</Label>
                                <Input value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                                <Label className="text-xs">Qty</Label>
                                <Input type="number" value={item.qty} onChange={e => updateItem(index, 'qty', Number(e.target.value))} />
                            </div>
                            <div className="col-span-3">
                                <Label className="text-xs">Price</Label>
                                <Input type="number" value={item.unit_price} onChange={e => updateItem(index, 'unit_price', Number(e.target.value))} />
                            </div>
                            <div className="col-span-1">
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)} disabled={items.length === 1}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                        <Plus className="h-4 w-4 mr-2" /> Add Item
                    </Button>
                </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {paymentTerms.map((term: string, index: number) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                value={term}
                                onChange={(e) => updateTerm(index, e.target.value)}
                                placeholder="e.g. 50% deposit upon confirmation."
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeTerm(index)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addTerm} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" /> Add Term
                    </Button>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (initialData ? 'Update Quotation' : 'Generate Quotation')}</Button>
            </div>
        </form>
    )
}
