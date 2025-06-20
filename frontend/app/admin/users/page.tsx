"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarLayout } from "@/components/sidebar-layout"
import { getCurrentUser, toggleUserStatus } from "@/lib/actions"
import { Search, UserCheck, UserX, Mail } from "lucide-react"

export default function AdminUsersPage() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Mock users data
  const mockUsers = [
    {
      id: 1,
      name: "Alexinard Simbeye",
      email: "alexinardmw@gmail.com",
      role: "student",
      active: true,
      student_id: "BICT3220",
      created_at: "2024-01-01T00:00:00Z",
      last_login: "2024-01-20T10:30:00Z",
    },
    {
      id: 2,
      name: "Promise Chirwa",
      email: "pchirwa@outlook.com",
      role: "student",
      active: true,
      student_id: "UNIMA/2021/002",
      created_at: "2024-01-02T00:00:00Z",
      last_login: "2024-01-19T14:20:00Z",
    },
    {
      id: 3,
      name: "Airtel Malawi",
      email: "admin@airtelmw.org",
      role: "employer",
      active: true,
      employer_name: "Airtel Malawi",
      created_at: "2024-01-03T00:00:00Z",
      last_login: "2024-01-18T09:15:00Z",
    },
    {
      id: 4,
      name: "Mzuzu University",
      email: "admin@mzuniversity.ac.mw",
      role: "institution",
      active: true,
      institution_name: "Mzuzu University",
      created_at: "2024-01-04T00:00:00Z",
      last_login: "2024-01-17T16:45:00Z",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (currentUser && currentUser.role === "admin") {
          // In a real app, fetch actual users
          setUsers(mockUsers)
          setFilteredUsers(mockUsers)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mounted])

  useEffect(() => {
    let filtered = users

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.student_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.employer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.institution_name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => (statusFilter === "active" ? user.active : !user.active))
    }

    setFilteredUsers(filtered)
  }, [searchQuery, roleFilter, statusFilter, users])

  const handleToggleUserStatus = async (userId: number, currentStatus: boolean) => {
    try {
      await toggleUserStatus(userId, !currentStatus)
      // Update local state
      setUsers(users.map((u) => (u.id === userId ? { ...u, active: !currentStatus } : u)))
    } catch (error) {
      console.error("Failed to toggle user status:", error)
    }
  }

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      student: "bg-blue-100 text-blue-800",
      employer: "bg-green-100 text-green-800",
      institution: "bg-purple-100 text-purple-800",
      admin: "bg-red-100 text-red-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  if (!mounted || loading) {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Loading users...</p>
        </div>
      </SidebarLayout>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <SidebarLayout user={user}>
        <div className="flex items-center justify-center h-64">
          <p>Access denied. Admin privileges required.</p>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage all system users and their permissions</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">Add New User</Button>
        </div>

        {/* User Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "student").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Employers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.role === "employer").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Institutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {users.filter((u) => u.role === "institution").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="employer">Employers</SelectItem>
                    <SelectItem value="institution">Institutions</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">
                  {users.length === 0 ? "No users found" : "No users match your search criteria"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUsers.map((userData) => (
              <Card key={userData.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-lg">{userData.name.charAt(0)}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{userData.name}</h3>
                          <Badge className={getRoleColor(userData.role)}>{userData.role}</Badge>
                          <Badge variant={userData.active ? "default" : "secondary"}>
                            {userData.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{userData.email}</span>
                          </div>
                          {userData.student_id && <span>ID: {userData.student_id}</span>}
                          {userData.employer_name && <span>Company: {userData.employer_name}</span>}
                          {userData.institution_name && <span>Institution: {userData.institution_name}</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined: {new Date(userData.created_at).toLocaleDateString()}
                          {userData.last_login && (
                            <span> • Last login: {new Date(userData.last_login).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleUserStatus(userData.id, userData.active)}
                      >
                        {userData.active ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}
