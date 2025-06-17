// Enhanced in-memory database for testing with MK currency
interface User {
  id: number
  name: string
  email: string
  password_hash: string
  role: string
  active: boolean
  student_id?: string
  institution_name?: string
  employer_name?: string
  created_at: string
}

interface Loan {
  id: number
  user_id: number
  amount: number
  remaining_amount: number
  term: number
  interest_rate: number
  purpose: string
  status: string
  start_date?: string
  last_payment_date?: string
  created_at: string
}

interface Transaction {
  id: number
  loan_id: number
  amount: number
  type: string
  payment_method?: string
  account_number?: string
  created_at: string
}

// Enhanced test database with more realistic Malawian data
const users: User[] = [
  {
    id: 1,
    name: "Alexinard Simbeye",
    email: "alexinardsimbeye@gmail.com",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "student",
    active: true,
    student_id: "BICT1920",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Promise Chirwa",
    email: "pchirwa@gmail.com",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "student",
    active: true,
    student_id: "UNIMA/2021/002",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Mphatso Phiri",
    email: "mphatso.student@example.com",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "student",
    active: true,
    student_id: "LUANAR/2023/003",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Airtel Malawi",
    email: "admin@airtelmw.org",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "employer",
    active: true,
    employer_name: "Airtel Malawi",
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "University of Malawi",
    email: "admin@mzuniversity.ac.mw",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "institution",
    active: true,
    institution_name: "Mzuzu University",
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "FDH Bank",
    email: "admin@heslgb.org",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "admin",
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Grace Tembo",
    email: "grace.student@example.com",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "student",
    active: true,
    student_id: "MUST/2023/004",
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Standard Bank Malawi",
    email: "employer@standardbank.com",
    password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "employer",
    active: true,
    employer_name: "Standard Bank Malawi",
    created_at: new Date().toISOString(),
  },
]

const loans: Loan[] = [
  {
    id: 1,
    user_id: 1,
    amount: 500000, // MK 500,000
    remaining_amount: 425000, // MK 425,000
    term: 24,
    interest_rate: 5.0,
    purpose: "Tuition Fees",
    status: "Active",
    start_date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months ago
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 2,
    amount: 250000, // MK 250,000
    remaining_amount: 210000, // MK 210,000
    term: 12,
    interest_rate: 5.0,
    purpose: "Books and Supplies",
    status: "Active",
    start_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 1,
    amount: 750000, // MK 750,000
    remaining_amount: 750000, // MK 750,000
    term: 36,
    interest_rate: 5.0,
    purpose: "Accommodation",
    status: "Pending",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    user_id: 3,
    amount: 300000, // MK 300,000
    remaining_amount: 270000, // MK 270,000
    term: 18,
    interest_rate: 5.0,
    purpose: "Research Materials",
    status: "Active",
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    user_id: 7,
    amount: 400000, // MK 400,000
    remaining_amount: 400000, // MK 400,000
    term: 24,
    interest_rate: 5.0,
    purpose: "Laboratory Equipment",
    status: "Pending",
    created_at: new Date().toISOString(),
  },
]

const transactions: Transaction[] = [
  {
    id: 1,
    loan_id: 1,
    amount: 25000, // MK 25,000
    type: "Payment",
    payment_method: "airtel_money",
    account_number: "+265991234567",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    loan_id: 2,
    amount: 20000, // MK 20,000
    type: "Payment",
    payment_method: "tnm_mpamba",
    account_number: "+265888765432",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    loan_id: 1,
    amount: 25000, // MK 25,000
    type: "Payment",
    payment_method: "bank_transfer",
    account_number: "NBM-1234567890",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    loan_id: 4,
    amount: 15000, // MK 15,000
    type: "Payment",
    payment_method: "airtel_money",
    account_number: "+265997654321",
    created_at: new Date().toISOString(),
  },
]

const nextId = {
  users: 9,
  loans: 6,
  transactions: 5,
}

// Mock SQL template function with enhanced MK currency support
export function sql(strings: TemplateStringsArray, ...values: any[]): Promise<any[]> {
  return new Promise((resolve) => {
    const query = strings.join("?").toLowerCase()

    try {
      // Parse basic SQL operations
      if (query.includes("select") && query.includes("from users")) {
        if (query.includes("where email =") && query.includes("and active =")) {
          const email = values[0]
          const user = users.find((u) => u.email === email && u.active)
          resolve(user ? [user] : [])
        } else if (query.includes("where id =") && query.includes("and active =")) {
          const id = values[0]
          const user = users.find((u) => u.id === id && u.active)
          resolve(user ? [user] : [])
        } else if (query.includes("where name =") || query.includes("or email =")) {
          const name = values[0]
          const email = values[1] || values[0]
          const user = users.find((u) => u.name === name || u.email === email)
          resolve(user ? [user] : [])
        }
      } else if (query.includes("insert into users")) {
        const [name, email, password_hash, role, student_id, institution_name, employer_name, active] = values
        const newUser: User = {
          id: nextId.users++,
          name,
          email,
          password_hash,
          role,
          active,
          student_id,
          institution_name,
          employer_name,
          created_at: new Date().toISOString(),
        }
        users.push(newUser)
        resolve([{ success: true }])
      } else if (query.includes("update users")) {
        const [password_hash, id] = values
        const userIndex = users.findIndex((u) => u.id === id)
        if (userIndex !== -1) {
          users[userIndex].password_hash = password_hash
          users[userIndex].active = true
        }
        resolve([{ success: true }])
      } else if (query.includes("select") && query.includes("from loans")) {
        if (query.includes("where user_id =")) {
          const userId = values[0]
          const userLoans = loans.filter((l) => l.user_id === userId)
          resolve(userLoans)
        } else if (query.includes("where id =")) {
          const loanId = values[0]
          const loan = loans.find((l) => l.id === loanId)
          resolve(loan ? [loan] : [])
        } else if (query.includes("join users u on l.user_id = u.id")) {
          const loansWithUsers = loans.map((loan) => {
            const user = users.find((u) => u.id === loan.user_id)
            return {
              ...loan,
              student_name: user?.name,
              student_id: user?.student_id,
            }
          })
          resolve(loansWithUsers)
        } else {
          resolve(loans)
        }
      } else if (query.includes("insert into loans")) {
        const [user_id, amount, term, purpose, status] = values
        const newLoan: Loan = {
          id: nextId.loans++,
          user_id,
          amount,
          remaining_amount: amount,
          term,
          interest_rate: 5.0,
          purpose,
          status,
          created_at: new Date().toISOString(),
        }
        loans.push(newLoan)
        resolve([{ id: newLoan.id }])
      } else if (query.includes("insert into transactions")) {
        const [loan_id, amount, type, payment_method, account_number] = values
        const newTransaction: Transaction = {
          id: nextId.transactions++,
          loan_id,
          amount,
          type,
          payment_method,
          account_number,
          created_at: new Date().toISOString(),
        }
        transactions.push(newTransaction)
        resolve([{ id: newTransaction.id }])
      } else if (query.includes("update loans")) {
        if (query.includes("set remaining_amount =")) {
          const [amount, loan_id] = values
          const loanIndex = loans.findIndex((l) => l.id === loan_id)
          if (loanIndex !== -1) {
            loans[loanIndex].remaining_amount -= amount
            loans[loanIndex].last_payment_date = new Date().toISOString()
          }
          resolve([{ success: true }])
        }
      } else if (query.includes("count(*)") || query.includes("sum(")) {
        if (query.includes("from loans") && !query.includes("where")) {
          const totalLoans = loans.length
          const activeStudents = new Set(loans.map((l) => l.user_id)).size
          const totalDisbursed = loans.reduce((sum, l) => sum + l.amount, 0)
          const activeLoans = loans.filter((l) => l.status === "Active").length
          const pendingLoans = loans.filter((l) => l.status === "Pending").length
          const completedLoans = loans.filter((l) => l.status === "Completed").length

          resolve([
            {
              total_loans: totalLoans,
              active_students: activeStudents,
              total_disbursed: totalDisbursed,
              active_loans: activeLoans,
              pending_loans: pendingLoans,
              completed_loans: completedLoans,
            },
          ])
        } else if (query.includes("where user_id =")) {
          const userId = values[0]
          const userLoans = loans.filter((l) => l.user_id === userId)
          const totalBorrowed = userLoans.reduce((sum, l) => sum + l.amount, 0)
          const outstandingBalance = userLoans.reduce((sum, l) => sum + l.remaining_amount, 0)

          resolve([
            {
              total_borrowed: totalBorrowed,
              outstanding_balance: outstandingBalance,
              total_loans: userLoans.length,
            },
          ])
        }
      }

      // Default fallback
      resolve([])
    } catch (error) {
      console.error("SQL Error:", error)
      resolve([])
    }
  })
}
