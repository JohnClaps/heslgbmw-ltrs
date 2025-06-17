import { Suspense } from "react"
import { SponsoredStudentsContent } from "@/components/employer/sponsored-students"
import { getCurrentUser } from "@/lib/actions"

export default async function SponsoredStudentsPage() {
  const user = await getCurrentUser()

  return (
    <Suspense fallback={<div>Loading sponsored students...</div>}>
      <SponsoredStudentsContent user={user} />
    </Suspense>
  )
}
