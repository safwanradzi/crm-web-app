
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { updateProfile } from './actions'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export function ProfileForm({ profile }: { profile: any }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)

        const result = await updateProfile(formData)
        setLoading(false)

        if (result.error) {
            alert(result.error)
        } else {
            alert('Settings updated successfully!')
            router.refresh()
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                    <CardDescription>
                        This information will appear on your Quotations and Invoices.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="business_name">Business Name</Label>
                        <Input id="business_name" name="business_name" defaultValue={profile?.business_name || ''} placeholder="My Design Agency" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="company_address">Address</Label>
                        <Input id="company_address" name="company_address" defaultValue={profile?.company_address || ''} placeholder="123 Creative St, Tech City" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="company_phone">Phone</Label>
                            <Input id="company_phone" name="company_phone" defaultValue={profile?.company_phone || ''} placeholder="+60 12-345 6789" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="company_email">Email</Label>
                            <Input id="company_email" name="company_email" defaultValue={profile?.company_email || ''} placeholder="hello@agency.com" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="company_website">Website</Label>
                        <Input id="company_website" name="company_website" defaultValue={profile?.company_website || ''} placeholder="www.agency.com" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Bank Details</CardTitle>
                    <CardDescription>
                        Used for payment instructions on Invoices/Quotations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="bank_name">Bank Name</Label>
                            <Input id="bank_name" name="bank_name" defaultValue={profile?.bank_name || ''} placeholder="Maybank" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bank_account_number">Account Number</Label>
                            <Input id="bank_account_number" name="bank_account_number" defaultValue={profile?.bank_account_number || ''} placeholder="1234567890" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bank_holder_name">Account Holder Name</Label>
                        <Input id="bank_holder_name" name="bank_holder_name" defaultValue={profile?.bank_holder_name || ''} placeholder="My Design Agency" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
