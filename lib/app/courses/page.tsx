// This file defines the courses page that lists all available training courses for visitors.
// It belongs to the public training catalog, accessible at the /courses route.

// ============================
// Imports
// ============================
import Link from "next/link";

// ============================
// Data handling (fetching from /api/courses)
// ============================

// This helper explains clearly how we fetch data:
// - It calls the /api/courses endpoint on the same application.
// - It disables caching so users always see up-to-date course data.
// - It returns an empty array if there is any problem, so the UI can show a safe empty state.

type CourseFromApi = {
  id: number;
  slug: string;
  title: string;
  category: string;
  duration: string;
  schedule: string;
};

async function fetchCoursesFromApi(): Promise<CourseFromApi[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/courses`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch courses:", response.statusText);
      return [];
    }

    const json = (await response.json()) as {
      success: boolean;
      data?: CourseFromApi[];
    };

    if (!json.success || !json.data) {
      return [];
    }

    return json.data;
  } catch (error) {
    console.error("Error while fetching courses:", error);
    return [];
  }
}

// ============================
// Main logic
// ============================

// This page:
// - Fetches real course data from the /api/courses endpoint using the helper above.
// - Handles an empty state if no courses are returned.
// - Leaves loading to the dedicated loading.tsx file in this route segment.

// ============================
// Course list UI
// ============================

export default async function CoursesPage() {
  // ============================
  // How data is fetched
  // ============================
  const courses = await fetchCoursesFromApi();

  return (
    <div className="flex w-full flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Training courses
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Browse the current set of training courses. The list below is loaded
          from the live /api/courses endpoint so it stays in sync with the
          database.
        </p>
      </header>

      <section className="space-y-4">
        {/* ============================
            How loading and empty states are handled
           ============================ */}
        {/* Loading is handled by app/courses/loading.tsx, which Next.js shows while this page is streaming. */}
        {/* If courses is empty (for example, before any courses are added), we show a simple friendly message. */}
        {courses.length === 0 ? (
          <p className="text-sm text-slate-300">
            There are no courses available yet. Please check back soon or
            contact our team to ask about upcoming training.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-300">
                Showing {courses.length} course
                {courses.length === 1 ? "" : "s"} across key training areas.
              </p>
            </div>

            {/* ============================
                How data is rendered
               ============================ */}
            {/* We map over the array of courses and show a simple, consistent card for each item. */}
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm shadow-slate-900/40"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-slate-50">
                        {course.title}
                      </h2>
                      <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-slate-200">
                        {course.category}
                      </span>
                    </div>

                    <dl className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div>
                        <dt className="text-[0.7rem] text-slate-400">
                          Duration
                        </dt>
                        <dd>{course.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.7rem] text-slate-400">
                          Schedule
                        </dt>
                        <dd>{course.schedule}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-indigo-500 px-4 py-1.5 text-xs font-medium text-indigo-100 transition hover:border-indigo-400 hover:bg-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                    >
                      View details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

