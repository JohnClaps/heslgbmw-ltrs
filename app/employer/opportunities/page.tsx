import { Suspense } from "react"
import { OpportunitiesContent } from "@/components/employer/opportunities"
import { getCurrentUser } from "@/lib/actions"

export default async function OpportunitiesPage() {
  const user = await getCurrentUser()

  return (
    <Suspense fallback={<div>Loading opportunities...</div>}>
      <OpportunitiesContent user={user} />
    </Suspense>
  )
}
