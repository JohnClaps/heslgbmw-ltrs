"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PayChanguPayment } from "./paychangu-payment"
import { PaymentSuccess } from "./payment-success"
import { makePayment } from "@/lib/actions"

interface EnhancedPaymentModalProps {
  loan: any
  onClose: () => void
  onSuccess: () => void
}

export function EnhancedPaymentModal({ loan, onClose, onSuccess }: EnhancedPaymentModalProps) {
  const [step, setStep] = useState<"payment" | "success">("payment")
  const [transactionData, setTransactionData] = useState<any>(null)

  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      // Record payment in database
      const result = await makePayment({
        loanId: loan.id,
        amount: loan.monthlyPayment,
        paymentMethod: "paychangu",
        accountNumber: transactionId,
      })

      setTransactionData({
        transactionId,
        amount: loan.monthlyPayment,
      })
      setStep("success")
    } catch (error) {
      console.error("Failed to record payment:", error)
    }
  }

  const handleClose = () => {
    onClose()
    if (step === "success") {
      onSuccess()
    }
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{step === "payment" ? "Make Payment" : "Payment Confirmation"}</DialogTitle>
        </DialogHeader>

        {step === "payment" && <PayChanguPayment loan={loan} onSuccess={handlePaymentSuccess} onCancel={onClose} />}

        {step === "success" && transactionData && (
          <PaymentSuccess
            transactionId={transactionData.transactionId}
            amount={transactionData.amount}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
