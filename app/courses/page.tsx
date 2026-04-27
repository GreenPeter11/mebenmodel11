"use client";

// app/courses/page.tsx — Public course listing with category filter buttons.

import { useEffect, useState } from "react";
import Link from "next/link";

type CourseFromApi = {
  id: number;
  slug: string;
  title: string;
  category: string;
  duration: string;
  schedule: string;
  description: string;
};

const CATEGORIES = ["All", "Business", "Agriculture", "IT"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  Business: "bg-blue-600/20 text-blue-300 border-blue-600/30",
  Agriculture: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
  IT: "bg-purple-600/20 text-purple-300 border-purple-600/30",
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  async function loadCourses(category: Category) {
    setIsLoading(true);
    try {
      const url = category === "All" ? "/api/courses" : `/api/courses?category=${category}`;
      const res = await fetch(url, { cache: "no-store" });
      const json = (await res.json()) as { success: boolean; data?: CourseFromApi[] };
      setCourses(json.success && json.data ? json.data : []);
    } catch {
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadCourses(activeCategory);
  }, [activeCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-50">Training Courses</h1>
        <p className="text-slate-400">Browse all available courses. Updated live from our database.</p>
      </div>

      {/* Category filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${activeCategory === cat
                ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-12 text-center">
          <p className="text-slate-400">
            {activeCategory === "All"
              ? "No courses available yet. Check back soon."
              : `No ${activeCategory} courses available yet.`}
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-xs text-slate-500">
            Showing {courses.length} course{courses.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm transition hover:border-slate-700"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-50">{course.title}</h2>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide ${CATEGORY_COLORS[course.category] ?? "bg-slate-800 text-slate-300 border-slate-700"}`}>
                      {course.category}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs text-slate-400">{course.description}</p>
                  <dl className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div>
                      <dt className="text-[0.7rem] text-slate-500">Duration</dt>
                      <dd>{course.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.7rem] text-slate-500">Schedule</dt>
                      <dd>{course.schedule}</dd>
                    </div>
                  </dl>
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-indigo-500 px-4 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20"
                  >
                    View & Enroll
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
