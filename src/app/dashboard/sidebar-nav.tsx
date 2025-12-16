'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
    Settings,
    Wallet,
    Globe,
    FileText,
    ArrowRightLeft,
    LayoutGrid,
    MessageSquare, // Added MessageSquare import
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Leads (Inbox)", href: "/dashboard/leads", icon: MessageSquare }, // Added Leads
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Projects", href: "/dashboard/projects", icon: Package },
    { name: "Domains", href: "/dashboard/domains", icon: Package2 },
    { name: "Quotations", href: "/dashboard/quotations", icon: ShoppingCart },
    { name: "Invoices", href: "/dashboard/invoices", icon: ShoppingCart },
    { name: "Expenses", href: "/dashboard/expenses", icon: ShoppingCart },
    { name: "Services / Add-ons", href: "/dashboard/addons", icon: Package },
    { name: "My Portfolio", href: "/dashboard/portfolios", icon: LayoutGrid },
]

interface SidebarNavProps {
    mobile?: boolean
}

export function SidebarNav({ mobile = false }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <>
            {navItems.map((item) => {
                const isActive = item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href)

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            mobile
                                ? "mx-[-0.65rem] gap-4 rounded-xl text-lg font-medium"
                                : "gap-3 rounded-lg bg-transparent text-muted-foreground",
                            isActive
                                ? "bg-muted text-primary"
                                : "text-muted-foreground",
                            // Mobile specific overrides for non-active items to match original
                            mobile && !isActive && "text-muted-foreground hover:text-foreground",
                            // Mobile specific overrides for active items
                            mobile && isActive && "bg-muted text-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon className={cn("h-4 w-4", mobile && "h-5 w-5")} />
                        {item.name}
                    </Link>
                )
            })}
        </>
    )
}
