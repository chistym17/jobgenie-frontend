"use client"
import React from 'react';
import Link from 'next/link';
import { Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-2 px-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-blue-600"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JobGenie
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/jobs" className="text-gray-700 hover:text-blue-600 transition">
            Find Jobs
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            How It Works
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
            Pricing
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Search size={20} className="text-gray-600" />
          </button>
          <Link
            href="/login"
            className="py-2 px-4 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 px-4 bg-white">
          <div className="flex flex-col space-y-4">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600 transition">
              Find Jobs
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                href="/login"
                className="py-2 px-4 rounded-lg border border-blue-600 text-blue-600 text-center"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="py-2 px-4 rounded-lg bg-blue-600 text-white text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
