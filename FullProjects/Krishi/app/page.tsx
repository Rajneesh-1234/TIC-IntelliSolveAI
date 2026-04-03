"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"

export default function Home() {
  const router = useRouter()
  const { role } = useAppStore()

  useEffect(() => {
    // Redirect to the appropriate dashboard based on role
    router.push(`/${role}`)
  }, [role, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  )
}
