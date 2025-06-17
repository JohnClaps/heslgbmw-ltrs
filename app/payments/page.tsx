"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarLayout } from "@/components/sidebar-layout"
import { getCurrentUser } from "@/lib/actions"
import { Search, Download, Calendar, CreditCard } from "lucide-react"

export default function PaymentsPage() {
  const [user, setUser] = useState<any>(null)
  const [payments, setPayments] = useState<any[]>([])
  const [filteredPayments, setFilteredPayments] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [methodFilter, setMethodFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Mock payment data
  const mockPayments = [
    {
      id: 1,
      loan_id: 1,
      amount: 25000,
      payment_method: "airtel_money",
      account_number: "+265991234567",
      paychangu_transaction_id: "PCU-TXN-001",
      status: "Completed",
      created_at: "2024-01-15T10:30:00Z",
      loan_purpose: "Tuition Fees",
    },
    {
      id: 2,
      loan_id: 2,
      amount: 20000,
      payment_method: "tnm_mpamba",
      account_number: "+265888765432",
      paychangu_transaction_id: "PCU-TXN-002",
      status: "Completed",
      created_at: "2024-01-10T14:20:00Z",
      loan_purpose: "Books and Supplies",
    },
    {
      id: 3,
      loan_id: 1,
      amount: 25000,
      payment_method: "bank_transfer",
      account_number: "NBM-1234567890",
      paychangu_transaction_id: "PCU-TXN-003",
      status: "Completed",
      created_at: "2024-01-05T09:15:00Z",
      loan_purpose: "Tuition Fees",
    },
    {
      id: 4,
      loan_id: 3,
      amount: 15000,
      payment_method: "debit_card",
      account_number: "****1234",
      paychangu_transaction_id: "PCU-TXN-004",
      status: "Processing",
      created_at: "2024-01-20T16:45:00Z",
      loan_purpose: "Research Materials",
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          // In a real app, fetch actual payment history
          setPayments(mockPayments)
          setFilteredPayments(mockPayments)
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
    let filtered = payments

    if (searchQuery) {
      filtered = filtered.filter(
        (payment) =>
          payment.paychangu_transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.loan_purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.loan_id.toString().includes(searchQuery),
      )
    }

    if (methodFilter !== "all") {
      filtered = filtered.filter((payment) => payment.payment_method === methodFilter)
    }

    setFilteredPayments(filtered)
  }, [searchQuery, methodFilter, payments])

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      airtel_money: "Airtel Money",
      tnm_mpamba: "TNM Mpamba",
      bank_transfer: "Bank Transfer",
      debit_card: "Debit Card",
    }
    return methods[method] || method
  }

  const downloadReceipt = (payment: any) => {
    const receiptData = {
      transactionId: payment.paychangu_transaction_id,
      amount: payment.amount,
      date: payment.created_at,
      method: payment.payment_method,
      status: payment.status,
      loanId: payment.loan_id,
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `receipt-${payment.paychangu_transaction_id}.json`
    link.click()
  }

  if (loading) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Loading payment history...</p>
        </div>
      </SidebarLayout>
    )
  }

  if (!user) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Please log in to view your payment history.</p>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
            <p className="text-muted-foreground">Track all your loan payments and transactions</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>

        {/* Payment Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payments.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                MK {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                MK{" "}
                {payments
                  .filter((p) => new Date(p.created_at).getMonth() === new Date().getMonth())
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Current month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by transaction ID, loan purpose..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="airtel_money">Airtel Money</SelectItem>
                    <SelectItem value="tnm_mpamba">TNM Mpamba</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">
                  {payments.length === 0 ? "No payments found" : "No payments match your search criteria"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPayments.map((payment) => (
              <Card key={payment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">MK {payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            Loan #{payment.loan_id} - {payment.loan_purpose}
                          </p>
                        </div>
                        <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{getPaymentMethodName(payment.payment_method)}</span>
                        <span>•</span>
                        <span>{payment.account_number}</span>
                        <span>•</span>
                        <span>{new Date(payment.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">
                        Transaction ID: {payment.paychangu_transaction_id}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => downloadReceipt(payment)}>
                        <Download className="mr-2 h-4 w-4" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}
