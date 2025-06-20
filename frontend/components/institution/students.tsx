"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, MessageCircle, FileText, GraduationCap, Calendar, TrendingUp } from "lucide-react"

interface InstitutionStudentsContentProps {
  user: any
}

export function InstitutionStudentsContent({ user }: InstitutionStudentsContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProgram, setFilterProgram] = useState("all")
  const [filterYear, setFilterYear] = useState("all")

  // Mock data for students
  const students = [
    {
      id: "STU001",
      name: "Alexinard Simbeye",
      email: "alexinardmw@gmail.com",
      program: "Information and Communication Technology",
      year: 4,
      gpa: null,
      status: "Active",
      loanStatus: "Approved",
      loanAmount: 850000,
      enrollmentDate: "2020-04-18",
      phone: "+265 990 085 196",
    },
    {
      id: "STU002",
      name: "Promise Chirwa",
      email: "pchirwa@gmail.com`",
      program: "Bachelor of arts social work",
      year: 4,
      gpa: 3.6,
      status: "Active",
      loanStatus: "Pending",
      loanAmount: 750000,
      enrollmentDate: "2021-09-01",
      phone: "+265 992 345 678",
    },
    {
      id: "STU003",
      name: "Mphatso Phiri",
      email: "mphatso.phiri@student.unima.mw",
      program: "Engineering",
      year: 4,
      gpa: 3.9,
      status: "Active",
      loanStatus: "Approved",
      loanAmount: 950000,
      enrollmentDate: "2021-09-01",
      phone: "+265 993 456 789",
    },
    {
      id: "STU004",
      name: "Grace Tembo",
      email: "grace.tembo@student.unima.mw",
      program: "Medicine",
      year: 1,
      gpa: 3.7,
      status: "Active",
      loanStatus: "Under Review",
      loanAmount: 1200000,
      enrollmentDate: "2024-09-01",
      phone: "+265 994 567 890",
    },
    {
      id: "STU005",
      name: "Patrick Kachingwe",
      email: "patrick.kachingwe@student.unima.mw",
      program: "Law",
      year: 3,
      gpa: 3.5,
      status: "Active",
      loanStatus: "Approved",
      loanAmount: 800000,
      enrollmentDate: "2022-09-01",
      phone: "+265 995 678 901",
    },
    {
      id: "STU006",
      name: "Mercy Gondwe",
      email: "mercy.gondwe@student.unima.mw",
      program: "Nursing",
      year: 2,
      gpa: 3.8,
      status: "Inactive",
      loanStatus: "Suspended",
      loanAmount: 700000,
      enrollmentDate: "2023-09-01",
      phone: "+265 996 789 012",
    },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProgram = filterProgram === "all" || student.program === filterProgram
    const matchesYear = filterYear === "all" || student.year.toString() === filterYear

    return matchesSearch && matchesProgram && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLoanStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage and monitor your institution's students</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterProgram} onValueChange={setFilterProgram}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Business Administration">Business Administration</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
                <SelectItem value="Law">Law</SelectItem>
                <SelectItem value="Nursing">Nursing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">Year 1</SelectItem>
                <SelectItem value="2">Year 2</SelectItem>
                <SelectItem value="3">Year 3</SelectItem>
                <SelectItem value="4">Year 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-orange-100 text-orange-700">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    {student.program} - Year {student.year}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>GPA: {student.gpa}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Loan Status:</span>
                  <Badge className={getLoanStatusColor(student.loanStatus)}>{student.loanStatus}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Loan Amount:</span>
                  <span className="font-medium">MK {student.loanAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageCircle className="mr-1 h-3 w-3" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No students found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
