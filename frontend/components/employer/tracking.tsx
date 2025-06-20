"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarLayout } from "@/components/sidebar-layout"

interface OpportunitiesContentProps {
  user: any
}

export function OpportunitiesContent({ user }: OpportunitiesContentProps) {
  // Mock opportunity data
  const opportunities = [
    {
      id: 1,
      name: "Grace Tembo",
      studentId: "UNIMA/2024/101",
      institution: "University of Malawi",
      course: "Information Technology",
      year: "1st Year",
      requestedAmount: 420000,
      gpa: 3.7,
      reason: "Need support for tuition fees and accommodation",
      skills: ["Programming", "Database Design", "Web Development"],
      avatar: "GT",
      urgency: "High",
    },
    {
      id: 2,
      name: "Peter Kachingwe",
      studentId: "MZUNI/2024/102",
      institution: "Mzuzu University",
      course: "Accounting",
      year: "2nd Year",
      requestedAmount: 350000,
      gpa: 3.5,
      reason: "Financial hardship due to family circumstances",
      skills: ["Financial Analysis", "Excel", "QuickBooks"],
      avatar: "PK",
      urgency: "Medium",
    },
    {
      id: 3,
      name: "Mary Chirwa",
      studentId: "POLY/2024/103",
      institution: "Malawi Polytechnic",
      course: "Civil Engineering",
      year: "3rd Year",
      requestedAmount: 480000,
      gpa: 3.9,
      reason: "Exceptional student needing final year support",
      skills: ["AutoCAD", "Project Management", "Structural Design"],
      avatar: "MC",
      urgency: "Low",
    },
    {
      id: 4,
      name: "Daniel Nyirenda",
      studentId: "UNIMA/2024/104",
      institution: "University of Malawi",
      course: "Medicine",
      year: "4th Year",
      requestedAmount: 650000,
      gpa: 3.8,
      reason: "Medical school expenses and clinical training costs",
      skills: ["Clinical Skills", "Research", "Patient Care"],
      avatar: "DN",
      urgency: "High",
    },
  ]

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Tracking</h1>
            <p className="text-muted-foreground">Student being tracked</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{opportunity.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{opportunity.name}</h3>
                          <Badge
                            variant={
                              opportunity.urgency === "High"
                                ? "destructive"
                                : opportunity.urgency === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {opportunity.urgency} Priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{opportunity.studentId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">MK {opportunity.requestedAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Requested</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Institution:</span>
                      <span>{opportunity.institution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course:</span>
                      <span>{opportunity.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year:</span>
                      <span>{opportunity.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPA:</span>
                      <span>{opportunity.gpa}/4.0</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Reason for Support:</p>
                    <p className="text-sm text-muted-foreground">{opportunity.reason}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Skills & Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                      Track Student
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
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
