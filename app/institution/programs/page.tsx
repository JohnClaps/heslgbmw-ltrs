import { Suspense } from "react"
import { InstitutionProgramsContent } from "@/components/institution/programs"
import { getCurrentUser } from "@/lib/actions"

export default async function InstitutionProgramsPage() {
  const user = await getCurrentUser()

  return (
    <Suspense fallback={<div>Loading programs...</div>}>
      <InstitutionProgramsContent user={user} />
    </Suspense>
  )
}
