import { getCurrentUser } from "@/lib/auth"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { EmployerDashboard } from "@/components/dashboards/employer-dashboard"
import { InstitutionDashboard } from "@/components/dashboards/institution-dashboard"
import {
  getStudentLoans,
  getStudentStats,
  getAllLoans,
  getAdminStats,
  getEmployerData,
  getInstitutionData,
} from "@/lib/actions"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/welcome")
  }

  // Load data based on user role and render appropriate dashboard
  switch (user.role) {
    case "student": {
      const [loans, stats] = await Promise.all([
        getStudentLoans(user.id).catch(() => []),
        getStudentStats(user.id).catch(() => ({})),
      ])
      return <StudentDashboard user={user} loans={loans} stats={stats} />
    }

    case "admin": {
      const [loans, stats] = await Promise.all([getAllLoans().catch(() => []), getAdminStats().catch(() => ({}))])
      return <AdminDashboard user={user} loans={loans} stats={stats} />
    }

    case "employer": {
      const data = await getEmployerData(user.id).catch(() => ({}))
      return <EmployerDashboard user={user} data={data} />
    }

    case "institution": {
      const data = await getInstitutionData(user.id).catch(() => ({}))
      return <InstitutionDashboard user={user} data={data} />
    }

    default:
      redirect("/welcome")
  }
}
