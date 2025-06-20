"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { makePayment } from "@/lib/actions"

interface PaymentModalProps {
  loan: any
  onClose: () => void
  onSuccess: () => void
}

export function PaymentModal({ loan, onClose, onSuccess }: PaymentModalProps) {
  const [paymentData, setPaymentData] = useState({
    amount: loan.monthlyPayment || "",
    paymentMethod: "",
    accountNumber: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await makePayment({
        loanId: loan.id,
        amount: Number.parseFloat(paymentData.amount),
        paymentMethod: paymentData.paymentMethod,
        accountNumber: paymentData.accountNumber,
      })

      setSuccess("Payment processed successfully!")
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (error: any) {
      setError(error.message || "Payment failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
          <DialogDescription>
            Make a payment for Loan #{loan.id}. This transaction will be recorded in the database.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={paymentData.amount}
              onChange={(e) => setPaymentData((prev) => ({ ...prev, amount: e.target.value }))}
              required
            />
            <p className="text-sm text-muted-foreground">Minimum payment: ${loan.monthlyPayment}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              value={paymentData.paymentMethod}
              onValueChange={(value) => setPaymentData((prev) => ({ ...prev, paymentMethod: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="debit_card">Debit Card</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="mobile_money">Mobile Money</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account/Card Number</Label>
            <Input
              id="accountNumber"
              type="text"
              value={paymentData.accountNumber}
              onChange={(e) => setPaymentData((prev) => ({ ...prev, accountNumber: e.target.value }))}
              placeholder="Enter account or card number"
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Make Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
