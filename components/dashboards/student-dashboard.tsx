"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedPaymentModal } from "@/components/payment/enhanced-payment-modal"
import { SidebarLayout } from "@/components/sidebar-layout"
import { DollarSign, GraduationCap, Calendar, TrendingUp, Award, Download, Shield } from "lucide-react"
import Link from "next/link"

interface StudentDashboardProps {
  user: any
  loans: any[]
  stats: any
}

export function StudentDashboard({ user, loans, stats }: StudentDashboardProps) {
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleMakePayment = (loan: any) => {
    setSelectedLoan(loan)
    setShowPaymentModal(true)
  }

  // Take Note that these would come from blockchain after full implementation
  // For now, we are using hardcoded data for demonstration purposes
  const rewards = [
    {
      id: 1,
      title: "Loan Completion Certificate",
      description: "Successfully completed loan repayment for Education Loan #001",
      dateEarned: "2024-01-15",
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      status: "Verified",
      type: "completion",
    },
    {
      id: 2,
      title: "Early Payment Achievement",
      description: "Made 6 consecutive early payments",
      dateEarned: "2023-12-10",
      blockchainHash: "0x9876543210fedcba0987654321abcdef",
      status: "Verified",
      type: "achievement",
    },
  ]

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">Manage your loan repayments and track your achievements</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MK {stats.totalBorrowed?.toLocaleString() || "0"}</div>
              <p className="text-xs text-muted-foreground">Across all loans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MK {stats.outstandingBalance?.toLocaleString() || "0"}</div>
              <p className="text-xs text-muted-foreground">Remaining to pay</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MK {stats.nextPayment?.amount || "0"}</div>
              <p className="text-xs text-muted-foreground">Due {stats.nextPayment?.date || "N/A"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repayment Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.repaymentProgress || 0}%</div>
              <p className="text-xs text-muted-foreground">Overall progress</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="loans" className="space-y-4">
          <TabsList>
            <TabsTrigger value="loans">My Loans</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="rewards">Rewards & Certificates</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="loans" className="space-y-4">
            <div className="grid gap-4">
              {loans.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4">No active loans found</p>
                    <p className="text-sm text-muted-foreground text-center">
                      This system is designed for loan recovery management.
                      <br />
                      Contact your institution for new loan applications.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                loans.map((loan) => (
                  <Card key={loan.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Loan #{loan.id}</CardTitle>
                          <CardDescription>{loan.purpose}</CardDescription>
                        </div>
                        <Badge variant={loan.status === "Active" ? "default" : "secondary"}>{loan.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                          <p className="text-sm font-medium text-muted-foreground">Next Due</p>
                          <p className="text-lg font-semibold">{loan.nextPaymentDate}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{loan.progress}%</span>
                        </div>
                        <Progress value={loan.progress} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleMakePayment(loan)}
                          disabled={loan.status !== "Active"}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          Pay with PayChangu
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/loans/${loan.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your payment history across all loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Payment history will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  Blockchain Certificates & Rewards
                </CardTitle>
                <CardDescription>Your achievements and certificates stored securely on the blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewards.length === 0 ? (
                    <div className="text-center py-8">
                      <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No rewards earned yet</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Complete your loan payments to earn certificates and achievements
                      </p>
                    </div>
                  ) : (
                    rewards.map((reward) => (
                      <Card key={reward.id} className="border-l-4 border-l-orange-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-orange-100 rounded-full">
                                {reward.type === "completion" ? (
                                  <GraduationCap className="h-6 w-6 text-orange-600" />
                                ) : (
                                  <Award className="h-6 w-6 text-orange-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{reward.title}</h3>
                                <p className="text-muted-foreground mb-2">{reward.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <span>Earned: {reward.dateEarned}</span>
                                  <Badge variant="outline" className="text-green-600 border-green-600">
                                    <Shield className="h-3 w-3 mr-1" />
                                    {reward.status}
                                  </Badge>
                                </div>
                                <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono">
                                  <span className="text-muted-foreground">Blockchain Hash: </span>
                                  <span className="text-blue-600">{reward.blockchainHash}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Documents</CardTitle>
                <CardDescription>Important documents related to your loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">No documents available.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
