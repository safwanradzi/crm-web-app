'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import Link from "next/link"
import { deleteInvoiceAction } from "./actions"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

export function InvoiceActions({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this invoice?')) {
            startTransition(async () => {
                const result = await deleteInvoiceAction(id)
                if (result) {
                    if (result.error) {
                        alert(result.error)
                    } else {
                        router.refresh()
                    }
                }
            })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`/dashboard/invoices/${id}`}>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/invoices/${id}/edit`}>
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    {isPending ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
