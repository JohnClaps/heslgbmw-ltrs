"use client"

// Client-side action for logout
export async function handleLogout() {
  try {
    // Clear the auth cookie
    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    // Redirect to login
    window.location.href = "/login"
  } catch (error) {
    console.error("Logout error:", error)
  }
}
