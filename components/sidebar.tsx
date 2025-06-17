"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText, Home, Package2, Settings, Users } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      icon: Home,
      title: "Dashboard",
    },
    {
      href: "/loans",
      icon: CreditCard,
      title: "Loans",
    },
    {
      href: "/payments",
      icon: FileText,
      title: "Payments",
    },
    {
      href: "/users",
      icon: Users,
      title: "Users",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <div className="hidden border-r bg-background md:block w-64">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>Loan Tracker</span>
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn("justify-start", pathname === route.href && "bg-secondary")}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
