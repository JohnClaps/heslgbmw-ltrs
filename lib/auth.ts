"use server"

import { cookies } from "next/headers"
import { sql } from "@/lib/db"

// Simple JWT alternative for testing
function verifyToken(token: string): any {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString())
  } catch {
    throw new Error("Invalid token")
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = verifyToken(token)

    const user = await sql`
      SELECT id, name, email, role, active
      FROM users
      WHERE id = ${decoded.userId} AND active = ${true}
    `

    return user[0] || null
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
