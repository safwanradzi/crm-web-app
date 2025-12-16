'use client'

import Link from "next/link"
import { Package2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOutClient } from "./actions"
import { usePathname } from "next/navigation"

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/portal/login'

    return (
        <div className="flex min-h-screen w-full flex-col">
            {!isLoginPage && (
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            href="/portal"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base mr-4"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="">My Portal</span>
                        </Link>
                        <Link
                            href="/portal"
                            className={`transition-colors hover:text-foreground ${pathname === '/portal' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/portal/projects"
                            className={`transition-colors hover:text-foreground ${pathname === '/portal/projects' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/portal/invoices"
                            className={`transition-colors hover:text-foreground ${pathname === '/portal/invoices' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
                        >
                            Invoices
                        </Link>
                    </nav>
                    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <div className="ml-auto flex-1 sm:flex-initial">
                        </div>
                        <form action={signOutClient}>
                            <Button variant="ghost" size="icon" title="Sign Out">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </header>
            )}
            <main className={`flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ${isLoginPage ? 'bg-slate-100' : 'bg-slate-50'}`}>
                {children}
            </main>
        </div>
    )
}
