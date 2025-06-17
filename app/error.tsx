"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">Something went wrong!</CardTitle>
          <CardDescription className="text-center">An error occurred while loading the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Button onClick={reset} className="mr-2">
              Try again
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/login")}>
              Go to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
