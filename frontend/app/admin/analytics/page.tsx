"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarLayout } from "@/components/sidebar-layout"
import { getCurrentUser } from "@/lib/actions"
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react"

export default function AdminAnalyticsPage() {
  const [user, setUser] = useState<any>(null)
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
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mounted])

  if (!mounted || loading) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Loading analytics...</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights and analytics for the loan system</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MK 2,450,000</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Borrowers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+8 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Default Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.1%</div>
              <p className="text-xs text-muted-foreground">-0.3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Loan Size</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MK 425,000</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Loan Distribution by Purpose</CardTitle>
              <CardDescription>Breakdown of loan purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tuition Fees</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Books & Supplies</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Accommodation</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Other</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Loan applications and disbursements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">January</span>
                  <span className="text-sm font-medium">MK 450,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">February</span>
                  <span className="text-sm font-medium">MK 520,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">March</span>
                  <span className="text-sm font-medium">MK 380,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">April</span>
                  <span className="text-sm font-medium">MK 610,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for the loan portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-semibold">Collection Efficiency</h4>
                <div className="text-2xl font-bold text-green-600">94.8%</div>
                <p className="text-xs text-muted-foreground">On-time payment rate</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Portfolio Growth</h4>
                <div className="text-2xl font-bold text-blue-600">18.5%</div>
                <p className="text-xs text-muted-foreground">Year-over-year growth</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Average Processing Time</h4>
                <div className="text-2xl font-bold text-orange-600">3.2 days</div>
                <p className="text-xs text-muted-foreground">From application to approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}
