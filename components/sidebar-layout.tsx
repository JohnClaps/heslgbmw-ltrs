"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Home,
  CreditCard,
  FileText,
  Users,
  Settings,
  Menu,
  User,
  LogOut,
  Building,
  GraduationCap,
  Search,
  BarChart3,
} from "lucide-react"
import { handleLogout } from "@/lib/client-actions"

interface SidebarLayoutProps {
  children: React.ReactNode
  user: any
}

export function SidebarLayout({ children, user }: SidebarLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getRoutes = () => {
    const baseRoutes = [
      {
        href: "/",
        icon: Home,
        title: "Dashboard",
        roles: ["student", "admin", "employer", "institution"],
      },
    ]

    // Return empty routes if user is null or doesn't have a role
    if (!user || !user.role) {
      return baseRoutes
    }

    switch (user.role) {
      case "student":
        return [
          ...baseRoutes,
          {
            href: "/loans",
            icon: CreditCard,
            title: "My Loans",
            roles: ["student"],
          },
          {
            href: "/payments",
            icon: FileText,
            title: "Payments",
            roles: ["student"],
          },
          {
            href: "/loans/new",
            icon: GraduationCap,
            title: "Manage Account",
            roles: ["student"],
          },
        ]
      case "admin":
        return [
          ...baseRoutes,
          {
            href: "/admin/loans",
            icon: CreditCard,
            title: "All Loans",
            roles: ["admin"],
          },
          {
            href: "/admin/users",
            icon: Users,
            title: "Users",
            roles: ["admin"],
          },
          {
            href: "/admin/search",
            icon: Search,
            title: "Search Portal",
            roles: ["admin"],
          },
          {
            href: "/admin/analytics",
            icon: BarChart3,
            title: "Analytics",
            roles: ["admin"],
          },
        ]
      case "employer":
        return [
          ...baseRoutes,
          {
            href: "/employer/students",
            icon: Users,
            title: "Loan Beneficiaries",
            roles: ["employer"],
          },
          {
            href: "/employer/opportunities",
            icon: Building,
            title: "Tracking",
            roles: ["employer"],
          },
        ]
      case "institution":
        return [
          ...baseRoutes,
          {
            href: "/institution/students",
            icon: Users,
            title: "Students",
            roles: ["institution"],
          },
          {
            href: "/institution/programs",
            icon: GraduationCap,
            title: "Programs",
            roles: ["institution"],
          },
        ]
      default:
        return baseRoutes
    }
  }

  const routes = getRoutes().filter((route) => !user || !user.role || route.roles.includes(user.role))

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.jpg" alt="Student-LTRS Logo" width={32} height={32} className="rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">Student-LTRS</span>
            <span className="text-xs text-muted-foreground">Loan Management</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                pathname === route.href && "bg-orange-100 text-orange-900 hover:bg-orange-200",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* User Menu */}
      {user && (
        <div className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user.name || "User"}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role || "user"}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name || "User"}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email || ""}</p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 border-r bg-background md:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
