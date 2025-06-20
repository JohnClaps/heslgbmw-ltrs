"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarLayout } from "@/components/sidebar-layout"
import { getCurrentUser, getAllLoans, approveLoan, rejectLoan } from "@/lib/actions"
import { Search, Eye, Check, X, Download } from "lucide-react"
import Link from "next/link"

export default function AdminLoansPage() {
  const [user, setUser] = useState<any>(null)
  const [loans, setLoans] = useState<any[]>([])
  const [filteredLoans, setFilteredLoans] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
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

  useEffect(() => {
    let filtered = loans

    if (searchQuery) {
      filtered = filtered.filter(
        (loan) =>
          loan.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loan.student_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loan.id.toString().includes(searchQuery) ||
          loan.purpose.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((loan) => loan.status.toLowerCase() === statusFilter)
    }

    setFilteredLoans(filtered)
  }, [searchQuery, statusFilter, loans])

  const handleApproveLoan = async (loanId: number) => {
    try {
      await approveLoan(loanId)
      // Refresh loans
      const allLoans = await getAllLoans()
      setLoans(allLoans)
      setFilteredLoans(allLoans)
    } catch (error) {
      console.error("Failed to approve loan:", error)
    }
  }

  const handleRejectLoan = async (loanId: number) => {
    try {
      await rejectLoan(loanId)
      // Refresh loans
      const allLoans = await getAllLoans()
      setLoans(allLoans)
      setFilteredLoans(allLoans)
    } catch (error) {
      console.error("Failed to reject loan:", error)
    }
  }

  if (!mounted || loading) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Loading loans...</p>
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Loan Management</h1>
            <p className="text-muted-foreground">Review and manage all student loans</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Create New Loan</Button>
          </div>
        </div>

        {/* Loan Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loans.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {loans.filter((l) => l.status === "Pending").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loans.filter((l) => l.status === "Active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                MK {loans.reduce((sum, l) => sum + (l.amount || 0), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name, ID, loan ID, or purpose..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loans Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Loans</CardTitle>
            <CardDescription>Complete list of all loans in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredLoans.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {loans.length === 0 ? "No loans found" : "No loans match your search criteria"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Loan ID</th>
                      <th className="pb-2 text-left font-medium">Student</th>
                      <th className="pb-2 text-left font-medium">Student ID</th>
                      <th className="pb-2 text-left font-medium">Amount</th>
                      <th className="pb-2 text-left font-medium">Purpose</th>
                      <th className="pb-2 text-left font-medium">Status</th>
                      <th className="pb-2 text-left font-medium">Date Applied</th>
                      <th className="pb-2 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLoans.map((loan) => (
                      <tr key={loan.id} className="border-b">
                        <td className="py-3">#{loan.id}</td>
                        <td className="py-3">{loan.student_name}</td>
                        <td className="py-3">{loan.student_id}</td>
                        <td className="py-3">MK {loan.amount?.toLocaleString()}</td>
                        <td className="py-3">{loan.purpose}</td>
                        <td className="py-3">
                          <Badge
                            variant={
                              loan.status === "Active"
                                ? "default"
                                : loan.status === "Pending"
                                  ? "secondary"
                                  : loan.status === "Completed"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {loan.status}
                          </Badge>
                        </td>
                        <td className="py-3">{new Date(loan.created_at).toLocaleDateString()}</td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/loans/${loan.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            {loan.status === "Pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveLoan(loan.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleRejectLoan(loan.id)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}
