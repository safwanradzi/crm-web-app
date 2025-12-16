'use client'

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteDomainAction } from "./actions"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteDomainButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this record?")) return
        setLoading(true)
        const result = await deleteDomainAction(id)
        setLoading(false)
        if (result.error) {
            alert(result.error)
        } else {
            router.refresh()
        }
    }

    return (
        <Button variant="ghost" size="icon" onClick={handleDelete} disabled={loading} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
