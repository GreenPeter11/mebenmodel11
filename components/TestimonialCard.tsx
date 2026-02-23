// This file defines a TestimonialCard component for displaying customer testimonials.
// It belongs to the shared UI components used on the home page testimonials section.

// ============================
// Imports
// ============================
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// ============================
// Types
// ============================

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  delay?: number;
};

// ============================
// Main logic
// ============================

// The TestimonialCard component displays a testimonial with:
// - Quote icon
// - Customer quote
// - Author name and role
// - Subtle fade-in animation

// ============================
// UI sections
// ============================

export function TestimonialCard(props: TestimonialCardProps) {
  const { quote, author, role, delay = 0 } = props;

  return (
    <motion.div
      className="rounded-2xl bg-white p-8 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Quote className="mb-4 h-8 w-8 text-indigo-600" />
      <p className="mb-6 text-gray-700">{quote}</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </motion.div>
  );
}
