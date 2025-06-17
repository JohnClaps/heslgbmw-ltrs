"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, Download, MessageSquare, User, Calendar, DollarSign } from "lucide-react"

interface SearchPortalProps {
  loans: any[]
}

export function SearchPortal({ loans }: SearchPortalProps) {
  if (loans.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No loans found matching your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-muted/50 rounded-lg font-medium text-sm">
        <div className="col-span-2">Student Info</div>
        <div className="col-span-2">Loan Details</div>
        <div className="col-span-2">Financial Info</div>
        <div className="col-span-2">Payment Status</div>
        <div className="col-span-2">Progress</div>
        <div className="col-span-2">Actions</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {loans.map((loan) => (
          <Card key={loan.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Student Info */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{loan.student_name}</p>
                      <p className="text-xs text-muted-foreground">ID: {loan.student_id}</p>
                    </div>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="col-span-1 md:col-span-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        #{loan.id}
                      </Badge>
                      <Badge variant={loan.status === "Active" ? "default" : "secondary"} className="text-xs">
                        {loan.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{loan.purpose}</p>
                  </div>
                </div>

                {/* Financial Info */}
                <div className="col-span-1 md:col-span-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="text-sm font-semibold">MK {loan.amount?.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Outstanding: MK {loan.remaining_amount?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="col-span-1 md:col-span-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-orange-600" />
                      <span className="text-sm font-medium">MK {loan.monthlyPayment?.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Due: {loan.nextPaymentDate || "N/A"}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="col-span-1 md:col-span-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span className="font-medium">{loan.progress || 0}%</span>
                    </div>
                    <Progress value={loan.progress || 0} className="h-1.5" />
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex flex-wrap gap-1">
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                      <Download className="mr-1 h-3 w-3" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile View - Additional Info */}
              <div className="md:hidden mt-4 pt-4 border-t space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Monthly Payment:</span>
                    <p className="font-semibold">MK {loan.monthlyPayment?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Due:</span>
                    <p className="font-semibold">{loan.nextPaymentDate || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Repayment Progress</span>
                    <span>{loan.progress || 0}%</span>
                  </div>
                  <Progress value={loan.progress || 0} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Footer */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              Showing {loans.length} loan{loans.length !== 1 ? "s" : ""}
            </span>
            <div className="flex space-x-4 text-xs">
              <span>
                Total Outstanding: MK{" "}
                {loans.reduce((sum, loan) => sum + (loan.remaining_amount || 0), 0).toLocaleString()}
              </span>
              <span>Active Loans: {loans.filter((loan) => loan.status === "Active").length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
