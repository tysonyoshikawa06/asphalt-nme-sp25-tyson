'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // need to complte submission form logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className={`min-h-screen bg-white ${poppins.className}`}>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-8 md:p-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="w-full">
            <div className="aspect-[3/2] w-full relative">
              <Image
                src="/images/road.jpeg"
                alt="Winding road through forest"
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <p className="mt-6 text-base text-gray-700 font-normal">
              Have a question or want to get in touch? Just fill out the form or{' '}
              <a href="mailto:info@asphalt.com" className="text-green-600 hover:text-green-700 underline">
                shoot us an email
              </a>
              —we'd love to hear from you!
            </p>
          </div>

          <div className="w-full">
            <h1 className="text-[52px] font-semibold mb-8 text-gray-800">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-500 text-base font-normal"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address*"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-500 text-base font-normal"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-500 text-base font-normal"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message*"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-500 text-base font-normal"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 text-base font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-gray-800 text-lg font-bold mb-4">Asphalt</h3>
            <p className="text-sm">
              Optimizing routes for a sustainable future.
            </p>
          </div>
          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/explore"
                  className="hover:text-gray-800 transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-800 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-800 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Email: info@asphalt.com</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="hover:text-gray-800 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-800 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-gray-800 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Asphalt. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
} 