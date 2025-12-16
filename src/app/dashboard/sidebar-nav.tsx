import { SheetClose } from "@/components/ui/sheet"

// ... (keep props and interfaces)

export function SidebarNav({ mobile = false }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <div className={cn("grid gap-1", mobile ? "py-4" : "")}>
            {navItems.map((item) => {
                const isActive = item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href)

                const LinkComponent = (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            mobile
                                ? "gap-4 rounded-xl text-muted-foreground w-full"
                                : "text-muted-foreground",
                            isActive
                                ? "bg-muted text-primary"
                                : "text-muted-foreground",
                            mobile && !isActive && "hover:bg-muted hover:text-foreground",
                            mobile && isActive && "bg-muted text-foreground"
                        )}
                    >
                        <item.icon className={cn("h-4 w-4", mobile && "h-5 w-5")} />
                        {item.name}
                    </Link>
                )

                if (mobile) {
                    return (
                        <SheetClose key={item.href} asChild>
                            {LinkComponent}
                        </SheetClose>
                    )
                }

                return LinkComponent
            })}
        </div>
    )
}
