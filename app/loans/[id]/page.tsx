"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { getLoanDetails, makePayment } from "@/lib/actions"
import { CalendarIcon, Clock, Download, FileText } from "lucide-react"

export default function LoanDetailsPage({ params }: { params: { id: string } }) {
  const [loan, setLoan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const data = await getLoanDetails(params.id)
        setLoan(data)
      } catch (error) {
        console.error("Failed to fetch loan details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLoan()
  }, [params.id])

  const handleMakePayment = async () => {
    if (!loan) return

    setPaymentLoading(true)
    try {
      await makePayment(loan.id, loan.nextPaymentAmount)
      // Refresh loan data after payment
      const updatedLoan = await getLoanDetails(params.id)
      setLoan(updatedLoan)
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setPaymentLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-40">
          <p>Loading loan details...</p>
        </div>
      </DashboardShell>
    )
  }

  // Update currency symbols from $ to MK in the loan details page

  // Replace the mock loan data with MK currency
  const mockLoan = {
    id: params.id,
    amount: "MK 10,000.00",
    term: "24 months",
    startDate: "2023-05-15",
    nextPaymentDate: "2023-06-15",
    nextPaymentAmount: "MK 458.33",
    remainingAmount: "MK 8,750.00",
    paidAmount: "MK 1,250.00",
    status: "Active",
    interestRate: "5.0%",
    purpose: "Business",
    progress: 12.5, // percentage paid
    transactions: [
      { id: "TXN-001", date: "2023-05-15", amount: "MK 458.33", type: "Payment" },
      { id: "TXN-002", date: "2023-04-15", amount: "MK 458.33", type: "Payment" },
      { id: "TXN-003", date: "2023-03-15", amount: "MK 458.33", type: "Payment" },
    ],
    documents: [
      { id: "DOC-001", name: "Loan Agreement", date: "2023-02-15" },
      { id: "DOC-002", name: "Payment Schedule", date: "2023-02-15" },
    ],
  }

  const loanData = loan || mockLoan

  return (
    <DashboardShell>
      <DashboardHeader heading={`Loan ${loanData.id}`} text="View and manage your loan details.">
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleMakePayment} disabled={paymentLoading}>
            {paymentLoading ? "Processing..." : "Make Payment"}
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Complete information about your loan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Loan Amount</p>
                <p className="text-lg font-semibold">{loanData.amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Term</p>
                <p className="text-lg font-semibold">{loanData.term}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                <p className="text-lg font-semibold">{loanData.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-lg font-semibold">{loanData.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
                <p className="text-lg font-semibold">{loanData.interestRate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Purpose</p>
                <p className="text-lg font-semibold">{loanData.purpose}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Repayment Progress</p>
                <p className="text-sm font-medium">{loanData.progress}%</p>
              </div>
              <Progress value={loanData.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Next Payment</CardTitle>
            <CardDescription>Details about your upcoming payment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p className="text-lg font-semibold">{loanData.nextPaymentDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Amount Due</p>
                <p className="text-lg font-semibold">{loanData.nextPaymentAmount}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleMakePayment} disabled={paymentLoading}>
              {paymentLoading ? "Processing..." : "Make Payment Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="mt-6">
        <TabsList>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>A record of all transactions related to this loan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Transaction ID</th>
                      <th className="pb-2 text-left font-medium">Date</th>
                      <th className="pb-2 text-left font-medium">Amount</th>
                      <th className="pb-2 text-left font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanData.transactions.map((transaction: any) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="py-3">{transaction.id}</td>
                        <td className="py-3">{transaction.date}</td>
                        <td className="py-3">{transaction.amount}</td>
                        <td className="py-3">{transaction.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Documents</CardTitle>
              <CardDescription>Important documents related to your loan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Document ID</th>
                      <th className="pb-2 text-left font-medium">Name</th>
                      <th className="pb-2 text-left font-medium">Date</th>
                      <th className="pb-2 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanData.documents.map((document: any) => (
                      <tr key={document.id} className="border-b">
                        <td className="py-3">{document.id}</td>
                        <td className="py-3">{document.name}</td>
                        <td className="py-3">{document.date}</td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
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
      </Tabs>
    </DashboardShell>
  )
}
