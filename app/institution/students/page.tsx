import { Suspense } from "react"
import { InstitutionStudentsContent } from "@/components/institution/students"
import { getCurrentUser } from "@/lib/actions"

export default async function InstitutionStudentsPage() {
  const user = await getCurrentUser()

  return (
    <Suspense fallback={<div>Loading students...</div>}>
      <InstitutionStudentsContent user={user} />
    </Suspense>
  )
}
