"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Users, DollarSign, Briefcase, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EmployerDashboardProps {
  user: any
  data: any
}

export function EmployerDashboard({ user, data }: EmployerDashboardProps) {
  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage student sponsorships and investments</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Sponsor Student</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sponsored Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.sponsored_students || 0}</div>
              <p className="text-xs text-muted-foreground">Active sponsorships</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MK {data?.total_investment?.toLocaleString() || "0"}</div>
              <p className="text-xs text-muted-foreground">In student loans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graduates Hired</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.graduates_hired || 0}</div>
              <p className="text-xs text-muted-foreground">From sponsored students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.roi || 0}%</div>
              <p className="text-xs text-muted-foreground">Return on investment</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">Sponsored Students</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sponsored Students</CardTitle>
                <CardDescription>Students you are currently sponsoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock sponsored students data */}
                  {[
                    {
                      id: 1,
                      name: "Chisomo Banda",
                      studentId: "UNIMA/2023/001",
                      institution: "University of Malawi",
                      course: "Computer Science",
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
                      studentId: "MZUNI/2023/002",
                      institution: "Mzuzu University",
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
                  ].map((student) => (
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
                                <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                                  {student.status}
                                </Badge>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Sponsorship Opportunities</h2>
                <p className="text-muted-foreground">Students seeking sponsorship support</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Sort</Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Mock opportunity data */}
              {[
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
              ].map((opportunity) => (
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
                          Sponsor Student
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Analytics</CardTitle>
                <CardDescription>Track your investment performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Analytics data will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  )
}
