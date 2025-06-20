import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-200 via-orange-100 to-gray-100">
      <Head>
        <title>About Us | HESLGB Student Loan Tracking and Repayment System</title>
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div>
            <Image className="rounded-full" src="/logo.jpg" height={100} width={100} alt="logo" style={{
                             objectFit:'cover',
              }}/>
            </div>
            <h1 className="text-lg font-bold text-blue-800">
              HESLGB Student Loan Tracking and Repayment System
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/about" className="text-blue-600 font-medium">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">About Our Loan Management System</h2>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">This is a Board put in place by a Parliamentary Act no: 2 of 2015 to finance access to higher education of needy and deserving students in Malawi. Its mandate as per the Act, is two- fold, that is, firstly, to disburse loans yearly to needy and deserving students pursuing higher education in government registered higher learning institutions (By National Council for Higher Education- NCHE) both public and private and are pursuing accredited programs and courses. Secondly, the Loans Board is to recover the former loans from former beneficiaries of the higher education loans scheme dating way back from 1985/86 academic calendar. This is with an intention of making the Higher Education Students Loans and Grants Board financially viable to become a revolving fund that will sustain itself in the long run and support more needy and deserving students.Secondly, the Loans Board is to recover the former loans from former beneficiaries of the higher education loans scheme dating way back from 1985/86 academic calendar. This is with an intention of making the Higher Education Students Loans and Grants Board financially viable to become a revolving fund that will sustain itself in the long run and support more needy and deserving students.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Blockchain Advantages</h4>
                <ul className="space-y-2 text-green-500">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    <span>Immutable loan records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    <span>Transparent transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    <span>Reduced fraud and errors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    <span>Automated smart contracts</span>
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Our Services</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Student loan applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Loan disbursement tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Repayment management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Institutional collaboration</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Technology</h3>
            <p className="text-gray-700 mb-6">
              Our system leverages Ethereum blockchain technology with smart contracts to automate loan 
              processes. This ensures all transactions are verifiable, tamper-proof, and executed 
              without intermediaries.
            </p>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow text-center">
                  <div className="text-blue-600 text-2xl mb-2">🔒</div>
                  <h5 className="font-medium mb-1">Secure Identity</h5>
                  <p className="text-sm text-gray-600">Wallet-based authentication</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                  <div className="text-blue-600 text-2xl mb-2">📊</div>
                  <h5 className="font-medium mb-1">Real-time Tracking</h5>
                  <p className="text-sm text-gray-600">Loan status updates</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                  <div className="text-blue-600 text-2xl mb-2">🤝</div>
                  <h5 className="font-medium mb-1">Multi-party</h5>
                  <p className="text-sm text-gray-600">Students, lenders, institutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
      {/* Back to Top Button */}
      <div className="fixed bottom-4 right-4">
        <Link href="#" className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16l4-4m0 0l-4-4m4 4H7m10 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </Link>       
    </div>
    </div>

  );
}
