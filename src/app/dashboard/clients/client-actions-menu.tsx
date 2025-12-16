'use client'

import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { deleteClientAction } from './actions'
import { ClientDialog } from './client-dialog'
import { useRouter } from 'next/navigation'

export function ClientActionsMenu({ client }: { client: any }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this client? This will delete all associated projects, invoices, and data.')) {
            return
        }

        setIsDeleting(true)
        try {
            const result = await deleteClientAction(client.id)
            if (result?.error) {
                alert(`Error deleting client: ${result.error}`)
            } else {
                // Success
                router.refresh()
            }
        } catch (error) {
            alert('An unexpected error occurred')
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={`/dashboard/clients/${client.id}`}>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                </Link>
                <div onClick={(e) => e.stopPropagation()}>
                    <ClientDialog client={client} trigger={
                        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                            Edit
                        </div>
                    } />
                </div>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600 cursor-pointer">
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
