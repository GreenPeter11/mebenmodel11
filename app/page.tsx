// This file defines the main public landing page with hero, features, courses, and testimonials sections.
// It belongs to the marketing and information page for public users (no authentication required).

// ============================
// Imports
// ============================
"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { FeatureCard } from "@/components/FeatureCard";
import { CourseCard } from "@/components/CourseCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

// ============================
// Main logic (data)
// ============================

// Mock data for courses and testimonials
const featuredCourses = [
  {
    id: 1,
    title: "Business Planning Foundations",
    description:
      "Master the essentials of business planning and strategy development for sustainable growth.",
    category: "Business",
    duration: "3 days",
    instructor: "Jane Doe",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    slug: "business-planning-foundations",
  },
  {
    id: 2,
    title: "Essential Computer Skills",
    description:
      "Build strong digital foundations with practical computer skills for the modern workplace.",
    category: "IT",
    duration: "4 evenings",
    instructor: "John Smith",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    slug: "essential-computer-skills",
  },
  {
    id: 3,
    title: "Smart Farming Essentials",
    description:
      "Learn modern agricultural practices and improve farm productivity with data-driven insights.",
    category: "Agriculture",
    duration: "3 days",
    instructor: "Maria Garcia",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    slug: "smart-farming-essentials",
  },
];

const testimonials = [
  {
    quote:
      "The business planning course transformed how I approach my work. Practical, clear, and immediately applicable.",
    author: "Sarah Johnson",
    role: "Small Business Owner",
  },
  {
    quote:
      "Best investment in my professional development. The instructors are knowledgeable and the content is top-notch.",
    author: "Michael Chen",
    role: "IT Professional",
  },
  {
    quote:
      "These courses helped me modernize my farming practices. Highly recommend to anyone in agriculture.",
    author: "David Williams",
    role: "Farm Manager",
  },
];

// ============================
// UI sections
// ============================

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      {/* ============================
          Hero section
         ============================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-20 sm:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Transform Your Skills,
              <br />
              <span className="text-indigo-200">Transform Your Future</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-indigo-100 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of learners mastering practical skills in Business,
              IT, and Agriculture. Expert-led courses designed for real-world
              impact.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button href="/courses" variant="primary" size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/courses" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Browse Courses
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================
          Features section
         ============================ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Mebenmodel?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Practical training designed for real-world success
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={BookOpen}
              title="Expert-Led Courses"
              description="Learn from industry professionals with years of practical experience."
              delay={0.1}
            />
            <FeatureCard
              icon={Users}
              title="Interactive Learning"
              description="Engage with hands-on exercises and real-world case studies."
              delay={0.2}
            />
            <FeatureCard
              icon={Award}
              title="Certified Programs"
              description="Earn recognized certificates that boost your career prospects."
              delay={0.3}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Career Growth"
              description="Skills that translate directly to workplace success and advancement."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ============================
          Courses section
         ============================ */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start your learning journey with our most popular programs
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button href="/courses" variant="outline" size="lg">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============================
          Testimonials section
         ============================ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of satisfied learners transforming their careers
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          CTA section
         ============================ */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Join thousands of learners advancing their careers today
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/courses"
                variant="primary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
