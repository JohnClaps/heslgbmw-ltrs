'use client'

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { CheckCircle, Plus, Minus } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

export default function Help() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-200 via-orange-100 to-gray-100">
      <Head>
        <title>Contact Us | HESLGB Student Loan Tracking and Repayment System</title>
      </Head>
<header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
                        <Image src="/logo.jpg" alt="Student-LTRS Logo" width={50} height={50} className="rounded-full" />
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Student-LTRS</h1>
                          <p className="text-sm text-gray-600">Loan Tracking & Repayment System</p>
                        </div>
                      </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/home">Home</Link>
                </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
        </div>
      </header>


      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-blue-700 mb-6">Send us a message</h3>

              {submitMessage && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {['name', 'email', 'subject'].map(field => (
                  <div key={field} className="mb-4">
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Subject'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      required
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Accordion Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-blue-700 mb-6">Our Contact Information</h3>
              <Accordion.Root type="multiple" className="space-y-4">
                {[
                  {
                    value: "item-1",
                    title: "Headquarters",
                    content: "Off Mchinji Road, Mbulo Office Complex, Lilongwe, Malawi"
                  },
                  {
                    value: "item-2",
                    title: "Contact Details",
                    content: (
                      <ul className="text-gray-600 space-y-2">
                        <li><span className="mr-2">📞</span>+265-9999-700-30</li>
                        <li><span className="mr-2">📧</span>info.loans@heslgb.com</li>
                        <li><span className="mr-2">🌐</span>www.heslgb.mw</li>
                      </ul>
                    )
                  },
                  {
                    value: "item-3",
                    title: "Office Hours",
                    content: (
                      <ul className="text-gray-600 space-y-1">
                        <li>Monday - Friday: 7:30 AM - 5:00 PM</li>
                        <li>Saturday: Closed</li>
                        <li>Sunday: Closed</li>
                      </ul>
                    )
                  },
                  {
                    value: "item-4",
                    title: "Technical Support",
                    content: (
                      <p className="text-gray-600">
                        For technical issues with the blockchain loan system, please contact:<br />
                        <span className="text-blue-600">support@heslgb-ltrs.mw</span>
                      </p>
                    )
                  }
                ].map(({ value, title, content }) => (
                  <Accordion.Item key={value} value={value} className="border border-gray-200 rounded-md">
                    <Accordion.Header>
                      <Accordion.Trigger className="flex justify-between items-center w-full px-4 py-3 text-left text-gray-800 font-medium hover:bg-gray-50">
                        <span>{title}</span>
                        <Accordion.Trigger asChild>
                          <span className="ml-2 text-blue-700">
                            <Plus className="h-5 w-5" />
                          </span>
                        </Accordion.Trigger>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-4 py-3 text-sm border-t border-gray-100 bg-gray-50">
                      {content}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
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
                <li><Link href="/login" className="hover:text-white transition-colors">Student Portal</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Employer Hub</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Institution Panel</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Student-LTRS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      
    </div>
  );
}
