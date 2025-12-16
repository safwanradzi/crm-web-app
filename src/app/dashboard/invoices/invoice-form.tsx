
'use client'

import { useState, useEffect } from 'react'
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
import { createInvoiceAction } from './actions'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { InvoiceItem } from '@/types'

interface InvoiceFormProps {
    clients: any[]
    projects: any[]
    nextInvoiceNumber?: string
}

export function InvoiceForm({ clients, projects, nextInvoiceNumber }: InvoiceFormProps) {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<InvoiceItem[]>([
        { description: 'Web Design Service', qty: 1, unit_price: 0, line_total: 0 }
    ])
    const [selectedClient, setSelectedClient] = useState('')
    const router = useRouter()

    // Calc totals
    const subtotal = items.reduce((sum, item) => sum + (item.qty * item.unit_price), 0)
    const [discount, setDiscount] = useState(0)
    const [taxRate, setTaxRate] = useState(0)

    const taxAmount = (subtotal - discount) * (taxRate / 100)
    const total = (subtotal - discount) + taxAmount

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...items]
        newItems[index] = { ...newItems[index], [field]: value }
        // Recalc line total
        newItems[index].line_total = newItems[index].qty * newItems[index].unit_price
        setItems(newItems)
    }

    const addItem = () => {
        setItems([...items, { description: '', qty: 1, unit_price: 0, line_total: 0 }])
    }

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index)
        setItems(newItems)
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        // Append calculated values
        formData.set('subtotal', subtotal.toFixed(2))
        formData.set('tax', taxAmount.toFixed(2))
        formData.set('total', total.toFixed(2))

        // We pass items separately as argument
        const result = await createInvoiceAction(formData, items)

        setLoading(false)

        if (result.error) {
            alert(result.error)
        } else {
            router.push('/dashboard/invoices')
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Client</Label>
                    <Select name="client_id" onValueChange={setSelectedClient} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Client" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Project (Optional)</Label>
                    <Select name="project_id" disabled={!selectedClient}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects
                                .filter(p => !selectedClient || p.client_id === selectedClient)
                                .map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Invoice Number</Label>
                    <Input name="invoice_number" defaultValue={nextInvoiceNumber || `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`} required />
                </div>
                <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input name="due_date" type="date" />
                </div>
                <div className="space-y-2">
                    <Label>Status</Label>
                    <Select name="status" defaultValue="draft">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* ITEMS SECTION */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Items</h3>
                </div>
                <Card>
                    <CardContent className="p-4 space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-end">
                                <div className="col-span-6">
                                    <Label className="text-xs">Description</Label>
                                    <Input
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                        placeholder="Item description"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label className="text-xs">Qty</Label>
                                    <Input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <Label className="text-xs">Price</Label>
                                    <Input
                                        type="number"
                                        value={item.unit_price}
                                        onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))}
                                    />
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
            </div>

            {/* TOTALS SECTION */}
            <div className="flex flex-col items-end space-y-2">
                <div className="w-full md:w-1/3 grid grid-cols-2 gap-2 items-center text-right">
                    <Label>Subtotal</Label>
                    <div className="font-mono">{subtotal.toFixed(2)}</div>
                </div>
                <div className="w-full md:w-1/3 grid grid-cols-2 gap-2 items-center text-right">
                    <Label>Discount (MYR)</Label>
                    <Input
                        name="discount"
                        type="number"
                        value={discount}
                        onChange={e => setDiscount(Number(e.target.value))}
                        className="text-right h-8"
                    />
                </div>
                <div className="w-full md:w-1/3 grid grid-cols-2 gap-2 items-center text-right">
                    <Label>Tax Rate (%)</Label>
                    <Input
                        type="number"
                        value={taxRate}
                        onChange={e => setTaxRate(Number(e.target.value))}
                        className="text-right h-8"
                    />
                </div>
                <div className="w-full md:w-1/3 grid grid-cols-2 gap-2 items-center text-right pt-2 border-t font-bold text-lg">
                    <Label>Total</Label>
                    <div className="font-mono">MYR {total.toFixed(2)}</div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create Invoice'}</Button>
            </div>
        </form>
    )
}
