// app/page.tsx — Public homepage. Fetches featured courses from the database (server component).

import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { FeatureCard } from "@/components/FeatureCard";
import { CourseCard } from "@/components/CourseCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

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

async function getFeaturedCourses() {
  try {
    return await prisma.course.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

const DEFAULT_IMAGES: Record<string, string> = {
  Business: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  Agriculture: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
  IT: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
};

export default async function HomePage() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div className="flex w-full flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Your Skills,
              <br />
              <span className="text-indigo-200">Transform Your Future</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100 sm:text-xl">
              Join thousands of learners mastering practical skills in Business, IT, and Agriculture.
              Expert-led courses designed for real-world impact.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/courses" variant="primary" size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/courses" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Mebenmodel?
            </h2>
            <p className="mt-4 text-lg text-gray-600">Practical training designed for real-world success</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={BookOpen} title="Expert-Led Courses" description="Learn from industry professionals with years of practical experience." delay={0.1} />
            <FeatureCard icon={Users} title="Interactive Learning" description="Engage with hands-on exercises and real-world case studies." delay={0.2} />
            <FeatureCard icon={Award} title="Certified Programs" description="Earn recognized certificates that boost your career prospects." delay={0.3} />
            <FeatureCard icon={TrendingUp} title="Career Growth" description="Skills that translate directly to workplace success and advancement." delay={0.4} />
          </div>
        </div>
      </section>

      {/* Featured Courses — live from database */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start your learning journey with our most popular programs
            </p>
          </div>

          {featuredCourses.length === 0 ? (
            <p className="mt-16 text-center text-gray-500">
              No courses available yet. Check back soon!
            </p>
          ) : (
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  duration={course.duration}
                  instructor={course.trainer}
                  rating={4.8}
                  imageUrl={
                    (course as { image?: string | null }).image ??
                    DEFAULT_IMAGES[course.category] ??
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                  }
                  slug={course.slug}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button href="/courses" variant="outline" size="lg">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of satisfied learners transforming their careers
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Join thousands of learners advancing their careers today
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/courses" variant="primary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
