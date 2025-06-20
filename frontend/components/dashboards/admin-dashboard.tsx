"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchPortal } from "@/components/search-portal"
import { SidebarLayout } from "@/components/sidebar-layout"
import { DollarSign, Users, CreditCard, TrendingUp, Search } from "lucide-react"

interface AdminDashboardProps {
  user: any
  loans: any[]
  stats: any
}

export function AdminDashboard({ user, loans, stats }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLoans, setFilteredLoans] = useState(loans)

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
        loan.id.toString().includes(query),
    )
    setFilteredLoans(filtered)
  }

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage loans, users, and system analytics</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Create New Loan</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_loans || 0}</div>
              <p className="text-xs text-muted-foreground">+{stats.newLoansThisMonth || 0} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_students || 0}</div>
              <p className="text-xs text-muted-foreground">With outstanding loans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MK {stats.total_disbursed?.toLocaleString() || "0"}</div>
              <p className="text-xs text-muted-foreground">Lifetime disbursements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.collectionRate || 0}%</div>
              <p className="text-xs text-muted-foreground">On-time payments</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="search" className="space-y-4">
          <TabsList>
            <TabsTrigger value="search">Student Search</TabsTrigger>
            <TabsTrigger value="loans">All Loans</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Loan Search Portal</CardTitle>
                <CardDescription>Search and track student loans by name, ID, or loan number</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by student name, ID, or loan number..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline">Advanced Search</Button>
                </div>

                <SearchPortal loans={filteredLoans} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Loans Overview</CardTitle>
                <CardDescription>Complete list of all loans in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">Loan ID</th>
                        <th className="pb-2 text-left font-medium">Student</th>
                        <th className="pb-2 text-left font-medium">Amount</th>
                        <th className="pb-2 text-left font-medium">Status</th>
                        <th className="pb-2 text-left font-medium">Next Payment</th>
                        <th className="pb-2 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.slice(0, 10).map((loan) => (
                        <tr key={loan.id} className="border-b">
                          <td className="py-3">#{loan.id}</td>
                          <td className="py-3">{loan.student_name}</td>
                          <td className="py-3">MK {loan.amount?.toLocaleString()}</td>
                          <td className="py-3">
                            <Badge variant={loan.status === "Active" ? "default" : "secondary"}>{loan.status}</Badge>
                          </td>
                          <td className="py-3">{loan.nextPaymentDate || "N/A"}</td>
                          <td className="py-3 text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Distribution</CardTitle>
                  <CardDescription>Breakdown by loan status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Active Loans</span>
                      <span className="font-medium">{stats.active_loans || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Loans</span>
                      <span className="font-medium">{stats.pending_loans || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Loans</span>
                      <span className="font-medium">{stats.completed_loans || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Loan applications and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure loan parameters and system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default Interest Rate (%)</label>
                    <Input type="number" defaultValue="5.0" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Maximum Loan Amount (MK)</label>
                    <Input type="number" defaultValue="5000000" className="mt-1" />
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  )
}
