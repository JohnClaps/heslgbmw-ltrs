"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarLayout } from "@/components/sidebar-layout"
import { SearchPortal } from "@/components/search-portal"
import { getCurrentUser, getAllLoans } from "@/lib/actions"
import { Search } from "lucide-react"

export default function AdminSearchPage() {
  const [user, setUser] = useState<any>(null)
  const [loans, setLoans] = useState<any[]>([])
  const [filteredLoans, setFilteredLoans] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (currentUser && currentUser.role === "admin") {
          const allLoans = await getAllLoans()
          setLoans(allLoans)
          setFilteredLoans(allLoans)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mounted])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredLoans(loans)
      return
    }

    const filtered = loans.filter(
      (loan) =>
        loan.student_name?.toLowerCase().includes(query.toLowerCase()) ||
        loan.student_id?.toLowerCase().includes(query.toLowerCase()) ||
        loan.id.toString().includes(query) ||
        loan.purpose.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredLoans(filtered)
  }

  if (!mounted || loading) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Loading search portal...</p>
        </div>
      </SidebarLayout>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Access denied. Admin privileges required.</p>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Search Portal</h1>
          <p className="text-muted-foreground">Search and track student loans by name, ID, or loan number</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Search</CardTitle>
            <CardDescription>Find students and their loan information quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, ID, loan number, or purpose..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <SearchPortal loans={filteredLoans} />
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}
