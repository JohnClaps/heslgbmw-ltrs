"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, ArrowLeft } from "lucide-react"

interface PaymentSuccessProps {
  transactionId: string
  amount: number
  onClose: () => void
}

export function PaymentSuccess({ transactionId, amount, onClose }: PaymentSuccessProps) {
  const downloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      transactionId,
      amount,
      date: new Date().toISOString(),
      status: "Completed",
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `receipt-${transactionId}.json`
    link.click()
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>Your loan payment has been processed successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Transaction ID:</span>
              <span className="font-mono text-sm">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <span className="font-semibold">MK {amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-600 font-semibold">Completed</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={downloadReceipt} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button onClick={onClose} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
