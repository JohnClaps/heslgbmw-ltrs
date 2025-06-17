"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Smartphone, CreditCard, Building, Shield, AlertCircle } from "lucide-react"
import Image from "next/image"

interface PayChanguPaymentProps {
  loan: any
  onSuccess: (transactionId: string) => void
  onCancel: () => void
}

export function PayChanguPayment({ loan, onSuccess, onCancel }: PayChanguPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amount, setAmount] = useState(loan.monthlyPayment || "")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankCode: "",
    accountName: "",
  })
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1) // 1: Method Selection, 2: Details, 3: Confirmation

  const paymentMethods = [
    {
      id: "airtel_money",
      name: "Airtel Money",
      icon: <Smartphone className="h-5 w-5 text-red-600" />,
      description: "Pay using your Airtel Money wallet",
      fee: "1.5%",
      color: "border-red-200 hover:border-red-300",
      bgColor: "bg-red-50",
    },
    {
      id: "tnm_mpamba",
      name: "TNM Mpamba",
      icon: <Smartphone className="h-5 w-5 text-blue-600" />,
      description: "Pay using TNM Mpamba mobile money",
      fee: "1.5%",
      color: "border-blue-200 hover:border-blue-300",
      bgColor: "bg-blue-50",
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: <Building className="h-5 w-5 text-green-600" />,
      description: "Direct bank transfer via PayChangu",
      fee: "MK 500",
      color: "border-green-200 hover:border-green-300",
      bgColor: "bg-green-50",
    },
    {
      id: "debit_card",
      name: "Debit/Credit Card",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      description: "Pay with your Visa or Mastercard",
      fee: "2.5%",
      color: "border-purple-200 hover:border-purple-300",
      bgColor: "bg-purple-50",
    },
  ]

  const banks = [
    { code: "NBM", name: "National Bank of Malawi" },
    { code: "STB", name: "Standard Bank Malawi" },
    { code: "FDH", name: "FDH Bank" },
    { code: "NBS", name: "NBS Bank" },
    { code: "CDH", name: "CDH Investment Bank" },
    { code: "INDE", name: "INDE Bank" },
    { code: "OPPORTUNITY", name: "Opportunity Bank" },
  ]

  const calculateFee = () => {
    const baseAmount = Number.parseFloat(amount) || 0
    const method = paymentMethods.find((m) => m.id === paymentMethod)
    if (!method) return 0

    if (method.fee.includes("%")) {
      const percentage = Number.parseFloat(method.fee.replace("%", ""))
      return (baseAmount * percentage) / 100
    } else {
      return Number.parseFloat(method.fee.replace("MK ", ""))
    }
  }

  const getTotalAmount = () => {
    return (Number.parseFloat(amount) || 0) + calculateFee()
  }

  const handleMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId)
    setError("")
    setStep(2)
  }

  const validatePhoneNumber = (phone: string) => {
    // Malawian phone number validation
    const phoneRegex = /^(\+265|265|0)?(99|88|77|21)\d{7}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateCardNumber = (cardNumber: string) => {
    // Basic card number validation (Luhn algorithm)
    const cleaned = cardNumber.replace(/\s/g, "")
    return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned)
  }

  const handleDetailsSubmit = () => {
    setError("")

    if (paymentMethod === "airtel_money" || paymentMethod === "tnm_mpamba") {
      if (!phoneNumber) {
        setError("Phone number is required")
        return
      }
      if (!validatePhoneNumber(phoneNumber)) {
        setError("Please enter a valid Malawian phone number (e.g., +265 991 234 567)")
        return
      }
    } else if (paymentMethod === "bank_transfer") {
      if (!bankDetails.accountNumber || !bankDetails.bankCode || !bankDetails.accountName) {
        setError("All bank details are required")
        return
      }
      if (bankDetails.accountNumber.length < 8) {
        setError("Please enter a valid account number")
        return
      }
    } else if (paymentMethod === "debit_card") {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardholderName) {
        setError("All card details are required")
        return
      }
      if (!validateCardNumber(cardDetails.cardNumber)) {
        setError("Please enter a valid card number")
        return
      }
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
        setError("Please enter expiry date in MM/YY format")
        return
      }
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        setError("Please enter a valid CVV")
        return
      }
    }

    setStep(3)
  }

  const processPayment = async () => {
    setLoading(true)
    setError("")

    try {
      // Simulate PayChangu API call with realistic processing
      const paymentData = {
        amount: getTotalAmount(),
        currency: "MWK",
        method: paymentMethod,
        phone: phoneNumber,
        bank: bankDetails,
        card: cardDetails,
        reference: `LOAN-${loan.id}-${Date.now()}`,
        callback_url: `${window.location.origin}/api/payment/callback`,
      }

      // Simulate different processing times for different methods
      const processingTime = {
        airtel_money: 3000,
        tnm_mpamba: 3500,
        bank_transfer: 5000,
        debit_card: 4000,
      }

      await new Promise((resolve) =>
        setTimeout(resolve, processingTime[paymentMethod as keyof typeof processingTime] || 3000),
      )

      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        const transactionId = `PCU-${paymentMethod.toUpperCase()}-${Date.now()}`
        onSuccess(transactionId)
      } else {
        throw new Error("Payment was declined. Please try again or use a different payment method.")
      }
    } catch (error: any) {
      setError(error.message || "Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.startsWith("265")) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
    } else if (cleaned.startsWith("0")) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
    }
    return phone
  }

  const formatCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "")
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim()
    return formatted
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Image src="/logo.png" alt="Student-LTRS" width={32} height={32} className="rounded-full" />
            <span className="font-bold text-lg">Student-LTRS Payment</span>
          </div>
          <CardTitle>Loan Payment - #{loan.id}</CardTitle>
          <CardDescription>Secure payment powered by PayChangu</CardDescription>
        </CardHeader>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Loan Amount:</span>
            <span className="font-semibold">MK {loan.amount?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Outstanding Balance:</span>
            <span className="font-semibold">MK {loan.remaining_amount?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly Payment:</span>
            <span className="font-semibold">MK {loan.monthlyPayment?.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount (MK)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min={loan.monthlyPayment}
            />
            <p className="text-xs text-muted-foreground">Minimum payment: MK {loan.monthlyPayment?.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Payment Method Selection */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`cursor-pointer hover:shadow-md transition-all border-2 ${method.color}`}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${method.bgColor}`}>{method.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      <Badge variant="outline">Fee: {method.fee}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Payment Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Enter your {paymentMethods.find((m) => m.id === paymentMethod)?.name} details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(paymentMethod === "airtel_money" || paymentMethod === "tnm_mpamba") && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+265 991 234 567"
                />
                <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Enter the phone number registered with your {paymentMethod.replace("_", " ")} account</p>
                    <p>Supported formats: +265991234567, 0991234567, 991234567</p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank_transfer" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank">Bank</Label>
                  <Select
                    value={bankDetails.bankCode}
                    onValueChange={(value) => setBankDetails({ ...bankDetails, bankCode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                    placeholder="Enter your account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input
                    id="accountName"
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                    placeholder="Enter account holder name"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "debit_card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={cardDetails.cardholderName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                    placeholder="Name as it appears on card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formatCardNumber(cardDetails.cardNumber)}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value.replace(/\s/g, "") })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      value={cardDetails.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "")
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4)
                        }
                        setCardDetails({ ...cardDetails, expiryDate: value })
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Your card details are encrypted and secure</span>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleDetailsSubmit} className="flex-1 bg-orange-600 hover:bg-orange-700">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm Payment</CardTitle>
            <CardDescription>Review your payment details before proceeding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-semibold">{paymentMethods.find((m) => m.id === paymentMethod)?.name}</span>
              </div>
              {paymentMethod === "airtel_money" || paymentMethod === "tnm_mpamba" ? (
                <div className="flex justify-between">
                  <span>Phone Number:</span>
                  <span className="font-semibold">{formatPhoneNumber(phoneNumber)}</span>
                </div>
              ) : paymentMethod === "bank_transfer" ? (
                <>
                  <div className="flex justify-between">
                    <span>Bank:</span>
                    <span className="font-semibold">{banks.find((b) => b.code === bankDetails.bankCode)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Account:</span>
                    <span className="font-semibold">****{bankDetails.accountNumber.slice(-4)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <span>Card:</span>
                  <span className="font-semibold">****{cardDetails.cardNumber.slice(-4)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Payment Amount:</span>
                <span className="font-semibold">MK {Number.parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee:</span>
                <span className="font-semibold">MK {calculateFee().toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-orange-600">MK {getTotalAmount().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your payment is secured by PayChangu with 256-bit SSL encryption</span>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1" disabled={loading}>
                Back
              </Button>
              <Button onClick={processPayment} disabled={loading} className="flex-1 bg-orange-600 hover:bg-orange-700">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Pay MK ${getTotalAmount().toLocaleString()}`
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cancel Button */}
      <div className="text-center">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancel Payment
        </Button>
      </div>
    </div>
  )
}
