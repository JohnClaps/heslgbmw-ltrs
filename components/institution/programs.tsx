"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Eye, Users, Clock, BookOpen, TrendingUp } from "lucide-react"

interface InstitutionProgramsContentProps {
  user: any
}

export function InstitutionProgramsContent({ user }: InstitutionProgramsContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")

  // Mock data for programs
  const programs = [
    {
      id: "PROG001",
      name: "Bachelor of Science in Information and Communication Technology",
      code: "BICT",
      department: "ICT",
      level: "Undergraduate",
      duration: 4,
      credits: 120,
      enrolledStudents: 245,
      maxCapacity: 300,
      tuitionFee: 850000,
      status: "Active",
      description: "Comprehensive program covering software development, algorithms, and computer systems.",
      requirements: ["Mathematics", "Physics", "English"],
      startDate: "2024-09-01",
    },
    {
      id: "PROG002",
      name: "Bachelor of Business Administration",
      code: "BBA",
      department: "Business",
      level: "Undergraduate",
      duration: 4,
      credits: 120,
      enrolledStudents: 189,
      maxCapacity: 250,
      tuitionFee: 750000,
      status: "Active",
      description: "Business fundamentals including management, marketing, and finance.",
      requirements: ["Mathematics", "English", "Economics"],
      startDate: "2024-09-01",
    },
    {
      id: "PROG003",
      name: "Bachelor of Electrical and Electronics Engineering",
      code: "BENG",
      department: "Engineering",
      level: "Undergraduate",
      duration: 5,
      credits: 150,
      enrolledStudents: 156,
      maxCapacity: 200,
      tuitionFee: 950000,
      status: "Active",
      description: "Engineering principles across multiple disciplines including civil, mechanical, and electrical.",
      requirements: ["Mathematics", "Physics", "Chemistry"],
      startDate: "2024-09-01",
    },
    {
      id: "PROG004",
      name: "Master of Business Administration",
      code: "MBA",
      department: "Business",
      level: "Postgraduate",
      duration: 2,
      credits: 60,
      enrolledStudents: 78,
      maxCapacity: 100,
      tuitionFee: 1200000,
      status: "Active",
      description: "Advanced business management and leadership program.",
      requirements: ["Bachelor's Degree", "Work Experience", "GMAT"],
      startDate: "2024-09-01",
    },
    {
      id: "PROG005",
      name: "Bachelor of Medicine",
      code: "MBBS",
      department: "Medicine",
      level: "Undergraduate",
      duration: 6,
      credits: 180,
      enrolledStudents: 89,
      maxCapacity: 100,
      tuitionFee: 1500000,
      status: "Active",
      description: "Comprehensive medical education program preparing future doctors.",
      requirements: ["Biology", "Chemistry", "Physics", "Mathematics"],
      startDate: "2024-09-01",
    },
    {
      id: "PROG006",
      name: "Bachelor of Laws",
      code: "LLB",
      department: "Law",
      level: "Undergraduate",
      duration: 4,
      credits: 120,
      enrolledStudents: 134,
      maxCapacity: 150,
      tuitionFee: 800000,
      status: "Under Review",
      description: "Legal education covering constitutional, criminal, and civil law.",
      requirements: ["English", "History", "Government"],
      startDate: "2024-09-01",
    },
  ]

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || program.department === filterDepartment
    const matchesLevel = filterLevel === "all" || program.level === filterLevel

    return matchesSearch && matchesDepartment && matchesLevel
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCapacityColor = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Academic Programs</h1>
          <p className="text-muted-foreground">Manage your institution's academic programs and courses</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
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
                  placeholder="Search programs by name, code, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
                <SelectItem value="Law">Law</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                <SelectItem value="Postgraduate">Postgraduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Programs List */}
      <div className="space-y-4">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-muted-foreground">Code: {program.code}</span>
                    <span className="text-sm text-muted-foreground">Department: {program.department}</span>
                    <Badge variant="outline">{program.level}</Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{program.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    Duration
                  </div>
                  <p className="font-medium">{program.duration} years</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="mr-1 h-3 w-3" />
                    Credits
                  </div>
                  <p className="font-medium">{program.credits}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    Enrollment
                  </div>
                  <p className={`font-medium ${getCapacityColor(program.enrolledStudents, program.maxCapacity)}`}>
                    {program.enrolledStudents}/{program.maxCapacity}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Tuition Fee
                  </div>
                  <p className="font-medium">MK {program.tuitionFee.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {program.requirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-3 w-3" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-3 w-3" />
                  Edit Program
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="mr-1 h-3 w-3" />
                  View Students
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No programs found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
