import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecentLoans() {
  const loans = [
    {
      id: "LOAN-1234",
      amount: "$5,000",
      date: "2023-05-15",
      status: "Active",
      nextPayment: "2023-06-15",
      remainingAmount: "$4,250",
    },
    {
      id: "LOAN-1235",
      amount: "$10,000",
      date: "2023-04-10",
      status: "Active",
      nextPayment: "2023-06-10",
      remainingAmount: "$8,000",
    },
    {
      id: "LOAN-1236",
      amount: "$2,500",
      date: "2023-03-22",
      status: "Completed",
      nextPayment: "-",
      remainingAmount: "$0",
    },
    {
      id: "LOAN-1237",
      amount: "$7,500",
      date: "2023-06-01",
      status: "Pending",
      nextPayment: "-",
      remainingAmount: "$7,500",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-2 text-left font-medium">ID</th>
            <th className="pb-2 text-left font-medium">Amount</th>
            <th className="pb-2 text-left font-medium">Date</th>
            <th className="pb-2 text-left font-medium">Status</th>
            <th className="pb-2 text-left font-medium">Next Payment</th>
            <th className="pb-2 text-left font-medium">Remaining</th>
            <th className="pb-2 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id} className="border-b">
              <td className="py-3">{loan.id}</td>
              <td className="py-3">{loan.amount}</td>
              <td className="py-3">{loan.date}</td>
              <td className="py-3">
                <Badge
                  variant={loan.status === "Active" ? "default" : loan.status === "Completed" ? "outline" : "secondary"}
                >
                  {loan.status}
                </Badge>
              </td>
              <td className="py-3">{loan.nextPayment}</td>
              <td className="py-3">{loan.remainingAmount}</td>
              <td className="py-3 text-right">
                <Link href={`/loans/${loan.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
