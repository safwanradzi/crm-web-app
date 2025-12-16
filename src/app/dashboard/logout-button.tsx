'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { signOut } from "../login/actions"
import { LogOut } from "lucide-react"

export function LogoutButton() {
    return (
        <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            onClick={async () => {
                await signOut()
            }}
        >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
        </DropdownMenuItem>
    )
}
