'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold">
          <img className="w-20 h-15" src="/images/logoo.png"></img>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links for Desktop and Mobile */}
        <div
          className={`${isOpen ? 'block' : 'hidden'
            } w-full md:w-auto md:flex items-center`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-white">
            <li>
              <Link href="/" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Home
              </Link>
            </li>

            <li>
              <Link href="/explore" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Explore
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}