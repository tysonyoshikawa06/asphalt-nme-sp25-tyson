'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import Footer from '../components/Footer';

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
    <>
      <main className={`min-h-screen bg-white ${poppins.className}`}>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-2 md:p-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-stretch mt-16">
            <div className="w-full flex flex-col h-full justify-end">
              <div>
                <div className="aspect-[3/2] w-full relative overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/images/road.jpeg"
                    alt="Winding road through forest"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <p className="mt-4 text-base text-gray-700 poppins-regular font-normal">
                  Have a question or want to get in touch? Just fill out the form or{' '}
                  <a href="mailto:info@asphalt.com" className="asphalt-green asphalt-green-hover underline poppins-regular">
                    shoot us an email
                  </a>
                  —we'd love to hear from you!
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <h1 className="text-[52px] poppins-semibold mb-4 text-gray-900">Contact Us</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name*"
                    required
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#034626] text-gray-700 placeholder-gray-600 text-base poppins-regular"
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
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#034626] text-gray-700 placeholder-gray-600 text-base poppins-regular"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#034626] text-gray-700 placeholder-gray-600 text-base poppins-regular"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message*"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#034626] text-gray-700 placeholder-gray-600 text-base poppins-regular"
                    style={{ resize: 'none', overflowY: 'auto' }} 
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#034626] hover:bg-[#023219] text-white px-8 py-3 rounded-2xl text-base poppins-bold transform transition-all hover:scale-105"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 