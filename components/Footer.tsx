// This file defines the global footer component with links, social icons, and contact info.
// It belongs to the main application layout and appears on all public pages.

// ============================
// Imports
// ============================
"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";

// ============================
// Main logic
// ============================

// The Footer component provides:
// - Navigation links
// - Contact information with icons
// - Social media links
// - Professional SaaS-style layout

// ============================
// UI sections
// ============================

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Mebenmodel</h3>
            <p className="text-sm text-gray-600">
              Practical training that helps people grow in work and in life.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-indigo-600"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-indigo-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-indigo-600"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:text-indigo-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-600 transition-colors hover:text-indigo-600"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-indigo-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors hover:text-indigo-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/courses?category=Business"
                  className="text-gray-600 transition-colors hover:text-indigo-600"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=IT"
                  className="text-gray-600 transition-colors hover:text-indigo-600"
                >
                  IT
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=Agriculture"
                  className="text-gray-600 transition-colors hover:text-indigo-600"
                >
                  Agriculture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>info@mebenmodel.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>123 Main Road, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mebenmodel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
