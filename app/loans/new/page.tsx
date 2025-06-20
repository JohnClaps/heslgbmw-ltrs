"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { createLoan } from "@/lib/actions"
import { SidebarLayout } from "@/components/sidebar-layout"
import { getCurrentUser } from "@/lib/auth"

export default function NewLoanPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(250000) // MK 250,000
  const [term, setTerm] = useState(12)
  const [purpose, setPurpose] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  React.useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createLoan({ amount, term, purpose })
      router.push("/")
    } catch (error) {
      console.error("Failed to create loan:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateMonthlyPayment = () => {
    const interestRate = 0.05 // 5% annual interest
    const monthlyRate = interestRate / 12
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term))
    return payment.toFixed(0)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <SidebarLayout user={user}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Apply for a Loan</h1>
          <p className="text-muted-foreground">Fill out the form below to apply for a new educational loan.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Loan Application</CardTitle>
                <CardDescription>Please provide the details for your loan request.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount: MK {amount.toLocaleString()}</Label>
                  <Slider
                    id="amount"
                    min={50000}
                    max={2000000}
                    step={25000}
                    value={[amount]}
                    onValueChange={(value) => setAmount(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>MK 50,000</span>
                    <span>MK 2,000,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="term">Loan Term (months): {term}</Label>
                  <Slider
                    id="term"
                    min={6}
                    max={60}
                    step={6}
                    value={[term]}
                    onValueChange={(value) => setTerm(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>6 months</span>
                    <span>60 months</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Loan Purpose</Label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tuition">Tuition Fees</SelectItem>
                      <SelectItem value="books">Books and Supplies</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="research">Research Materials</SelectItem>
                      <SelectItem value="equipment">Laboratory Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {purpose === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="purpose-details">Please specify</Label>
                    <Input id="purpose-details" placeholder="Enter loan purpose" />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading || !purpose} className="bg-orange-600 hover:bg-orange-700">
                  {loading ? "Processing..." : "Submit Application"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
              <CardDescription>Review your loan details before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Loan Amount</p>
                <p className="text-2xl font-bold">MK {amount.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Loan Term</p>
                <p className="text-xl">{term} months</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Interest Rate</p>
                <p className="text-xl">5.0% APR</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Estimated Monthly Payment</p>
                <p className="text-2xl font-bold">MK {calculateMonthlyPayment()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Repayment</p>
                <p className="text-xl">MK {(Number.parseFloat(calculateMonthlyPayment()) * term).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}
