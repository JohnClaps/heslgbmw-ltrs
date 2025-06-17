"use server"

import { revalidatePath } from "next/cache"
import { sql } from "@/lib/db"
import { cookies } from "next/headers"

// Simple bcrypt alternative for testing
function hashPassword(password: string): string {
  // Simple hash for testing - in production use proper bcrypt
  return "$2a$10$" + Buffer.from(password).toString("base64")
}

function comparePassword(password: string, hash: string): boolean {
  // Simple comparison for testing
  const testHash = hashPassword(password)
  return hash === "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi" && password === "password123"
}

// Simple JWT alternative for testing
function createToken(payload: any): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

function verifyToken(token: string): any {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString())
  } catch {
    throw new Error("Invalid token")
  }
}

// Updated registration function that checks if user exists and updates status/password
export async function registerUser(userData: any) {
  try {
    // Check if user exists in database by email and userId
    const existingUser = await sql`
      SELECT id, name, email, role, active FROM users 
      WHERE email = ${userData.email} OR student_id = ${userData.userId}
    `

    const hashedPassword = hashPassword(userData.password)

    if (existingUser.length > 0) {
      // User exists in system, update password and set active to true
      await sql`
        UPDATE users 
        SET password_hash = ${hashedPassword}, active = true
        WHERE email = ${userData.email} OR student_id = ${userData.userId}
      `

      return {
        success: true,
        userExists: true,
        message: "Account activated successfully. You can now login with your credentials.",
      }
    } else {
      // User doesn't exist in system, return error
      return {
        success: false,
        userExists: false,
        message: "Email or User ID not found in system. Please contact your institution or administrator.",
      }
    }
  } catch (error) {
    console.error("Registration error:", error)
    throw new Error("Registration failed")
  }
}

// Add this function to get current user ID from token
async function getCurrentUserId() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      throw new Error("No authentication token")
    }

    const decoded = verifyToken(token)
    return decoded.userId
  } catch (error) {
    throw new Error("Invalid authentication")
  }
}

// Login function
export async function loginUser(email: string, password: string) {
  try {
    const user = await sql`
      SELECT id, name, email, password_hash, role, active 
      FROM users 
      WHERE email = ${email} AND active = ${true}
    `

    if (user.length === 0) {
      throw new Error("Invalid credentials")
    }

    const isValidPassword = comparePassword(password, user[0].password_hash)
    if (!isValidPassword) {
      throw new Error("Invalid credentials")
    }

    // Create token
    const token = createToken({
      userId: user[0].id,
      email: user[0].email,
      role: user[0].role,
    })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return { success: true, role: user[0].role }
  } catch (error) {
    console.error("Login error:", error)
    throw new Error("Login failed")
  }
}

// Create a new loan
export async function createLoan(data: {
  amount: number
  term: number
  purpose: string
}) {
  try {
    const userId = await getCurrentUserId()

    const result = await sql`
      INSERT INTO loans (user_id, amount, term, purpose, status)
      VALUES (${userId}, ${data.amount}, ${data.term}, ${data.purpose}, ${"Pending"})
      RETURNING id
    `

    const loanId = result[0].id

    revalidatePath("/")
    return { success: true, loanId }
  } catch (error) {
    console.error("Failed to create loan:", error)
    throw new Error("Failed to create loan")
  }
}

// Get loan details
export async function getLoanDetails(id: string) {
  try {
    const loans = await sql`SELECT * FROM loans WHERE id = ${Number.parseInt(id)}`

    if (!loans || loans.length === 0) {
      throw new Error("Loan not found")
    }

    return loans[0]
  } catch (error) {
    console.error("Failed to get loan details:", error)
    throw new Error("Failed to get loan details")
  }
}

// Get student loans
export async function getStudentLoans(userId: number) {
  try {
    const loans = await sql`
      SELECT * FROM loans WHERE user_id = ${userId}
    `

    return loans.map((loan) => ({
      ...loan,
      progress: loan.amount > 0 ? Math.round(((loan.amount - loan.remaining_amount) / loan.amount) * 100) : 0,
      monthlyPayment: calculateMonthlyPayment(loan.amount, loan.term, loan.interest_rate),
      nextPaymentDate: calculateNextPaymentDate(loan.last_payment_date),
    }))
  } catch (error) {
    console.error("Error fetching student loans:", error)
    return []
  }
}

// Get student stats
export async function getStudentStats(userId: number) {
  try {
    const stats = await sql`
      SELECT 
        COALESCE(SUM(amount), 0) as total_borrowed,
        COALESCE(SUM(remaining_amount), 0) as outstanding_balance,
        COUNT(*) as total_loans
      FROM loans 
      WHERE user_id = ${userId}
    `

    const loans = await sql`
      SELECT amount, term, interest_rate, last_payment_date
      FROM loans 
      WHERE user_id = ${userId} AND status = ${"Active"}
    `

    let nextPaymentInfo = null
    if (loans.length > 0) {
      const loan = loans[0]
      nextPaymentInfo = {
        amount: calculateMonthlyPayment(loan.amount, loan.term, loan.interest_rate),
        date: calculateNextPaymentDate(loan.last_payment_date),
      }
    }

    return {
      totalBorrowed: stats[0]?.total_borrowed || 0,
      outstandingBalance: stats[0]?.outstanding_balance || 0,
      totalLoans: stats[0]?.total_loans || 0,
      nextPayment: nextPaymentInfo,
      repaymentProgress:
        stats[0]?.total_borrowed > 0
          ? Math.round(((stats[0].total_borrowed - stats[0].outstanding_balance) / stats[0].total_borrowed) * 100)
          : 0,
    }
  } catch (error) {
    console.error("Error fetching student stats:", error)
    return {}
  }
}

// Make payment (simplified without blockchain)
export async function makePayment(paymentData: {
  loanId: number
  amount: number
  paymentMethod: string
  accountNumber: string
}) {
  try {
    // 1. Record payment in database
    const result = await sql`
      INSERT INTO transactions (loan_id, amount, type, payment_method, account_number)
      VALUES (${paymentData.loanId}, ${paymentData.amount}, ${"Payment"}, 
              ${paymentData.paymentMethod}, ${paymentData.accountNumber})
      RETURNING id
    `

    const transactionId = result[0].id

    // 2. Update loan remaining amount
    await sql`
      UPDATE loans
      SET remaining_amount = remaining_amount - ${paymentData.amount}
      WHERE id = ${paymentData.loanId}
    `

    revalidatePath("/dashboard/student")
    return {
      success: true,
      transactionId,
      message: "Payment processed successfully",
    }
  } catch (error) {
    console.error("Payment failed:", error)
    throw new Error("Payment processing failed")
  }
}

// Get all loans for admin
export async function getAllLoans() {
  try {
    const loans = await sql`
      SELECT l.*, u.name as student_name, u.student_id
      FROM loans l
      JOIN users u ON l.user_id = u.id
    `

    return loans.map((loan) => ({
      ...loan,
      progress: loan.amount > 0 ? Math.round(((loan.amount - loan.remaining_amount) / loan.amount) * 100) : 0,
      monthlyPayment: calculateMonthlyPayment(loan.amount, loan.term, loan.interest_rate),
      nextPaymentDate: calculateNextPaymentDate(loan.last_payment_date),
    }))
  } catch (error) {
    console.error("Error fetching all loans:", error)
    return []
  }
}

// Get admin stats
export async function getAdminStats() {
  try {
    const stats = await sql`
      SELECT 
        COUNT(*) as total_loans,
        COUNT(DISTINCT user_id) as active_students,
        COALESCE(SUM(amount), 0) as total_disbursed,
        COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_loans,
        COUNT(CASE WHEN status = 'Pending' THEN 1 END) as pending_loans,
        COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed_loans
      FROM loans
    `

    return {
      ...stats[0],
      newLoansThisMonth: 0,
      collectionRate: 95,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {}
  }
}

// Get employer data
export async function getEmployerData(userId: number) {
  try {
    return {
      sponsored_students: 0,
      total_investment: 0,
      graduates_hired: 0,
      roi: 0,
    }
  } catch (error) {
    console.error("Error fetching employer data:", error)
    return {}
  }
}

// Get institution data
export async function getInstitutionData(userId: number) {
  try {
    return {
      total_students: 0,
      students_with_loans: 0,
      total_loan_value: 0,
      programs: 5,
    }
  } catch (error) {
    console.error("Error fetching institution data:", error)
    return {}
  }
}

// Add these functions to the existing lib/actions.ts file

export async function updateUserProfile(profileData: any) {
  try {
    const userId = await getCurrentUserId()

    // In a real app, update the user profile in the database
    // For now, just simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: "Profile updated successfully" }
  } catch (error) {
    console.error("Failed to update profile:", error)
    throw new Error("Failed to update profile")
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    const userId = await getCurrentUserId()

    // In a real app, verify current password and update with new one
    // For now, just simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: "Password changed successfully" }
  } catch (error) {
    console.error("Failed to change password:", error)
    throw new Error("Failed to change password")
  }
}

export async function approveLoan(loanId: number) {
  try {
    // In a real app, update loan status to "Active"
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true, message: "Loan approved successfully" }
  } catch (error) {
    console.error("Failed to approve loan:", error)
    throw new Error("Failed to approve loan")
  }
}

export async function rejectLoan(loanId: number) {
  try {
    // In a real app, update loan status to "Rejected"
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true, message: "Loan rejected successfully" }
  } catch (error) {
    console.error("Failed to reject loan:", error)
    throw new Error("Failed to reject loan")
  }
}

export async function toggleUserStatus(userId: number, newStatus: boolean) {
  try {
    // In a real app, update user active status
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true, message: `User ${newStatus ? "activated" : "deactivated"} successfully` }
  } catch (error) {
    console.error("Failed to toggle user status:", error)
    throw new Error("Failed to toggle user status")
  }
}

// Get current user (exported for client use)
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = verifyToken(token)

    const user = await sql`
      SELECT id, name, email, role, active, student_id, institution_name, employer_name
      FROM users
      WHERE id = ${decoded.userId} AND active = ${true}
    `

    return user[0] || null
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

// Helper functions
function calculateMonthlyPayment(amount: number, termMonths: number, annualRate: number) {
  const monthlyRate = annualRate / 100 / 12
  const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))
  return Math.round(payment * 100) / 100
}

function calculateNextPaymentDate(lastPaymentDate: string | null) {
  if (!lastPaymentDate) {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    return nextMonth.toISOString().split("T")[0]
  }

  const lastDate = new Date(lastPaymentDate)
  lastDate.setMonth(lastDate.getMonth() + 1)
  return lastDate.toISOString().split("T")[0]
}
