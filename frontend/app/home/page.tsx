"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  BookOpen,
  Building,
  UserCheck,
} from "lucide-react"

export default function HomePage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const animatedTexts = [
    "Your Education, Our Support",
    "Decentralised Loan Repayment",
    "Easy Loan Tracking",
    "Secure Loan Recovery Solutions",
  ]

  useEffect(() => {
    const currentText = animatedTexts[currentTextIndex]

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentTextIndex, animatedTexts])

  const features = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Student-Focused",
      description: "Designed specifically for students to manage their educational loans efficiently",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Transparent",
      description: "Distributed Ledger Technology(DLT) ensures secure,immutable and transparent loan tracking and recording",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-Stakeholder",
      description: "Connects students, institutions, employers, and lenders in one platform",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Smart Analytics",
      description: "Intelligent insights to help you make informed financial decisions",
    },
  ]

  const demoUsers = [
    {
      role: "student",
      name: "Student Portal",
      icon: <GraduationCap className="h-5 w-5" />,
      email: "alexinardmw@gmail.com",
    },
    { role: "admin", name: "Admin Dashboard", icon: <UserCheck className="h-5 w-5" />, email: "gasmw@gmail.com" },
    { role: "employer", name: "Employer Hub", icon: <Building className="h-5 w-5" />, email: "admin@airtelmw.org" },
    {
      role: "institution",
      name: "Institution Panel",
      icon: <BookOpen className="h-5 w-5" />,
      email: "admin@mzuniversity.ac.mw",
    },
  ]

  const handleDemo = (email: string) => {
    setActiveDemo(email)
    // In a real app, you might auto-login the demo user
    setTimeout(() => {
      window.location.href = `/login?demo=${email}`
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.jpg" alt="Student-LTRS Logo" width={50} height={50} className="rounded-full" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student-LTRS</h1>
                <p className="text-sm text-gray-600">Loan Tracking & Repayment System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 animate-bounce">
              🎓 Empowering Student Success
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="block mb-2 animate-fade-in">Your Education,</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600 min-h-[1.2em] inline-block">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              Student-LTRS makes educational financing easier by connecting students, institutions, employers, and
              lenders in a transparent, secure, and efficient ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/register">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="hover:scale-105 transition-all duration-200">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">Why Choose Student-LTRS?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Our platform is built with students at the heart, providing comprehensive tools for loan management and
              repayment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center text-white mb-4 transform hover:rotate-12 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Perspectivesi.e students,employers,loans board and higher learning institutions */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">Try Our Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Experience different user perspectives with our interactive demo accounts.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {demoUsers.map((user, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                    {user.icon}
                  </div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full transform hover:scale-105 transition-all duration-200"
                    variant="outline"
                    onClick={() => handleDemo(user.email)}
                    disabled={activeDemo === user.email}
                  >
                    {activeDemo === user.email ? "Loading..." : "Explore"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-yellow-200 via-orange-100 to-gray-100">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">Frequently Asked Questions</h2>
            <p className="text-gray-600 animate-slide-up">Get answers to common questions about Student-LTRS.</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 animate-fade-in">
              <AccordionTrigger className="text-left">
                How does Student-LTRS help students manage loan repayments?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our system provides a comprehensive dashboard where students can view all their loans, track payment
                schedules, make payments through mobile platforms, and monitor their repayment progress. The platform also offers insights and
                analytics to help students make informed financial decisions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border rounded-lg px-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <AccordionTrigger className="text-left">
                Is my financial information secure on this platform?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, the system uses enterprise level blockchain to securely and immutably store all your loan repayment transactions. All financial data is protected and we comply with relevant data protection
                regulations(GDPR).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border rounded-lg px-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <AccordionTrigger className="text-left">
                Can employers and institutions use this platform?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Student-LTRS is designed as a multi-stakeholder platform. Employers can sponsor students and track their
                investments, while institutions can manage their students' loan applications and monitor academic
                progress tied to financial aid.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border rounded-lg px-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <AccordionTrigger className="text-left">How do I get started with Student-LTRS?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Getting started is easy! Simply click "Get Started" to create your account, choose your role (student,
                employer, institution, or admin), and complete the registration process. You can also try our demo
                accounts to explore the platform first.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border rounded-lg px-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <AccordionTrigger className="text-left">
                What makes Student-LTRS different from other loan management systems?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Student-LTRS is specifically designed for students and Malawi's higher education loans and grants board to repay and track loans respectively with features like multi-stakeholder
                support, transparent tracking and institution integration. Our platform
                focuses on the unique needs of the education financing ecosystem.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">Ready to return what you owe?</h2>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              Join thousands of fellow employees, institutions, and employers who trust Student-LTRS for their educational loan
              management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/register">
                  Create Account <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.jpg" alt="Student-LTRS Logo" width={40} height={40} className="rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">Student-LTRS</h3>
                  <p className="text-gray-400 text-sm">Loan Tracking & Repayment System</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering students with transparent, secure, and efficient educational loan management. Building
                bridges between students, institutions, employers, and lenders.
              </p>
              <div className="flex space-x-4">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-400">Secure & Transparent</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Employer Hub
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Institution Panel
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Student-LTRS. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
