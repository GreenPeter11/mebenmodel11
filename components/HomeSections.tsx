"use client";

// components/HomeSections.tsx — Client wrapper for all interactive homepage sections.
// Handles icon props, framer-motion, and CourseCard rendering client-side.

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/Button";
import { FeatureCard } from "@/components/FeatureCard";
import { CourseCard } from "@/components/CourseCard";
import { TestimonialCard } from "@/components/TestimonialCard";

type Course = {
    id: number;
    title: string;
    description: string;
    category: string;
    duration: string;
    trainer: string;
    slug: string;
    imageUrl: string;
};

const testimonials = [
    {
        quote: "The business planning course transformed how I approach my work. Practical, clear, and immediately applicable.",
        author: "Sarah Johnson",
        role: "Small Business Owner",
    },
    {
        quote: "Best investment in my professional development. The instructors are knowledgeable and the content is top-notch.",
        author: "Michael Chen",
        role: "IT Professional",
    },
    {
        quote: "These courses helped me modernize my farming practices. Highly recommend to anyone in agriculture.",
        author: "David Williams",
        role: "Farm Manager",
    },
];

export function HomeSections({ courses }: { courses: Course[] }) {
    return (
        <>
            {/* Features */}
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
                        <FeatureCard icon={BookOpen} title="Expert-Led Courses" description="Learn from industry professionals with years of practical experience." delay={0.1} />
                        <FeatureCard icon={Users} title="Interactive Learning" description="Engage with hands-on exercises and real-world case studies." delay={0.2} />
                        <FeatureCard icon={Award} title="Certified Programs" description="Earn recognized certificates that boost your career prospects." delay={0.3} />
                        <FeatureCard icon={TrendingUp} title="Career Growth" description="Skills that translate directly to workplace success and advancement." delay={0.4} />
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
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

                    {courses.length === 0 ? (
                        <p className="mt-16 text-center text-gray-500">
                            No courses available yet. Check back soon!
                        </p>
                    ) : (
                        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    id={course.id}
                                    title={course.title}
                                    description={course.description}
                                    category={course.category}
                                    duration={course.duration}
                                    instructor={course.trainer}
                                    rating={4.8}
                                    imageUrl={course.imageUrl}
                                    slug={course.slug}
                                />
                            ))}
                        </div>
                    )}

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

            {/* Testimonials */}
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
                            <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
