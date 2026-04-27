// app/page.tsx — Server component: fetches courses from DB, renders hero + CTA directly,
// delegates icon/motion/coursecard sections to <HomeSections> (client component).

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HomeSections } from "@/components/HomeSections";

const DEFAULT_IMAGES: Record<string, string> = {
  Business: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  Agriculture: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
  IT: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
};

async function getFeaturedCourses() {
  try {
    const courses = await prisma.course.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return courses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      duration: c.duration,
      trainer: c.trainer,
      slug: c.slug,
      imageUrl:
        (c as { image?: string | null }).image ??
        DEFAULT_IMAGES[c.category] ??
        DEFAULT_IMAGES.Business,
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div className="flex w-full flex-col">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Your Skills,<br />
              <span className="text-indigo-200">Transform Your Future</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100 sm:text-xl">
              Join thousands of learners mastering practical skills in Business, IT, and Agriculture.
              Expert-led courses designed for real-world impact.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-gray-100"
              >
                Get Started
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features + Courses + Testimonials (client) ── */}
      <HomeSections courses={featuredCourses} />

      {/* ── CTA ── */}
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
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-gray-100"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
