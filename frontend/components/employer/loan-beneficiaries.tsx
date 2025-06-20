"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarLayout } from "@/components/sidebar-layout"

interface SponsoredStudentsContentProps {
  user: any
}

export function SponsoredStudentsContent({ user }: SponsoredStudentsContentProps) {
  // Mock sponsored students data
  const sponsoredStudents = [
    {
      id: 1,
      name: "Chisomo Banda",
      studentId: "BICT2322",
      institution: "Mzuzu University",
      course: "BSc Information and Communication Technology",
      year: "3rd Year",
      amount: 450000,
      startDate: "2023-09-01",
      status: "Active",
      gpa: 3.8,
      avatar: "CB",
    },
    {
      id: 2,
      name: "Thandiwe Mwale",
      studentId: "UNIMA/2023/002",
      institution: "University of Malawi",
      course: "Business Administration",
      year: "2nd Year",
      amount: 380000,
      startDate: "2023-09-15",
      status: "Active",
      gpa: 3.6,
      avatar: "TM",
    },
    {
      id: 3,
      name: "James Phiri",
      studentId: "POLY/2022/003",
      institution: "Malawi Polytechnic",
      course: "Engineering",
      year: "4th Year",
      amount: 520000,
      startDate: "2022-09-01",
      status: "Graduating",
      gpa: 3.9,
      avatar: "JP",
    },
  ]

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tracked Students</h1>
            <p className="text-muted-foreground">Students you are currently tracking</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export List</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">New Track</Button>
          </div>
        </div>

        <div className="space-y-4">
          {sponsoredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-lg">{student.avatar}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>Student ID:</strong> {student.studentId}
                        </p>
                        <p>
                          <strong>Institution:</strong> {student.institution}
                        </p>
                        <p>
                          <strong>Course:</strong> {student.course} ({student.year})
                        </p>
                        <p>
                          <strong>GPA:</strong> {student.gpa}/4.0
                        </p>
                        <p>
                          <strong>Sponsorship Amount:</strong> MK {student.amount.toLocaleString()}
                        </p>
                        <p>
                          <strong>Start Date:</strong> {new Date(student.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      View Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Student
                    </Button>
                    {student.status === "Graduating" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Offer Job
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}
