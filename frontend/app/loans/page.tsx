"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarLayout } from "@/components/sidebar-layout"
import { EnhancedPaymentModal } from "@/components/payment/enhanced-payment-modal"
import { getCurrentUser, getStudentLoans } from "@/lib/actions"
import { Search } from "lucide-react"
import Link from "next/link"

export default function LoansPage() {
  const [user, setUser] = useState<any>(null)
  const [loans, setLoans] = useState<any[]>([])
  const [filteredLoans, setFilteredLoans] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          const userLoans = await getStudentLoans(currentUser.id)
          setLoans(userLoans)
          setFilteredLoans(userLoans)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = loans

    if (searchQuery) {
      filtered = filtered.filter(
        (loan) =>
          loan.purpose.toLowerCase().includes(searchQuery.toLowerCase()) || loan.id.toString().includes(searchQuery),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((loan) => loan.status.toLowerCase() === statusFilter)
    }

    setFilteredLoans(filtered)
  }, [searchQuery, statusFilter, loans])

  const handleMakePayment = (loan: any) => {
    setSelectedLoan(loan)
    setShowPaymentModal(true)
  }

  if (loading) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Loading loans...</p>
        </div>
      </SidebarLayout>
    )
  }

  if (!user) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Please log in to view your loans.</p>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Loans</h1>
            <p className="text-muted-foreground">Manage and track all your educational loans</p>
          </div>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/loans/new">Apply for New Loan</Link>
          </Button>
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
                    placeholder="Search by purpose or loan ID..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loans List */}
        <div className="grid gap-4">
          {filteredLoans.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">
                  {loans.length === 0 ? "No loans found" : "No loans match your search criteria"}
                </p>
                {loans.length === 0 && (
                  <Button asChild className="bg-orange-600 hover:bg-orange-700">
                    <Link href="/loans/new">Apply for Your First Loan</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredLoans.map((loan) => (
              <Card key={loan.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Loan #{loan.id}</CardTitle>
                      <CardDescription>{loan.purpose}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        loan.status === "Active" ? "default" : loan.status === "Completed" ? "outline" : "secondary"
                      }
                    >
                      {loan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Original Amount</p>
                      <p className="text-lg font-semibold">MK {loan.amount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                      <p className="text-lg font-semibold">MK {loan.remaining_amount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Monthly Payment</p>
                      <p className="text-lg font-semibold">MK {loan.monthlyPayment?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Term</p>
                      <p className="text-lg font-semibold">{loan.term} months</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Next Due</p>
                      <p className="text-lg font-semibold">{loan.nextPaymentDate || "N/A"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Repayment Progress</span>
                      <span>{loan.progress || 0}%</span>
                    </div>
                    <Progress value={loan.progress || 0} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleMakePayment(loan)}
                      disabled={loan.status !== "Active"}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Make Payment
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/loans/${loan.id}`}>View Details</Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Download Statement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {showPaymentModal && selectedLoan && (
          <EnhancedPaymentModal
            loan={selectedLoan}
            onClose={() => setShowPaymentModal(false)}
            onSuccess={() => {
              setShowPaymentModal(false)
              window.location.reload()
            }}
          />
        )}
      </div>
    </SidebarLayout>
  )
}
