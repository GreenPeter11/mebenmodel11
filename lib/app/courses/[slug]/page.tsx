// This file defines the dynamic course details page, showing full information for a single course.
// It belongs to the public training catalog and is accessible at the /courses/[slug] route.

// ============================
// Imports
// ============================
import type { ReactElement } from "react";
import { prisma } from "@/lib/prisma";
import { CourseRegistrationModal } from "@/components/CourseRegistrationModal";

// ============================
// Data fetching logic (database lookup by slug)
// ============================

// This helper shows clearly how course data is fetched:
// - It receives the slug from the route parameters.
// - It queries the database for a single course with that slug using Prisma.
// - It returns null if anything goes wrong, so the caller can show a simple error state.
async function getCourseBySlug(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
    });

    return course;
  } catch (error) {
    console.error("Error while fetching course by slug:", error);
    return null;
  }
}

// ============================
// Main logic
// ============================

type CoursePageProps = {
  params: {
    slug: string;
  };
};

export default async function CourseDetailPage(
  props: CoursePageProps,
): Promise<ReactElement | null> {
  // ============================
  // How slug is read
  // ============================
  // Next.js passes route parameters through the `params` prop.
  // We read the slug directly from these params so that we can look up the matching course.
  const {
    params: { slug },
  } = props;

  // ============================
  // How course data is fetched
  // ============================
  const course = await getCourseBySlug(slug);

  // ============================
  // How errors are handled
  // ============================
  // If no course is found or an error occurred during fetching,
  // we show a simple "not found" message instead of breaking the page.
  if (!course) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Course not found
        </h1>
        <p className="text-sm text-slate-300">
          We could not find details for this course. Please check the link or
          go back to the main courses page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      {/* ============================
          Course information section
         ============================ */}
      <section className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-sm shadow-slate-900/40">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-slate-200">
            <span>{course.category}</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            {course.title}
          </h1>

          <p className="max-w-2xl text-sm text-slate-300">
            {course.description}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-50">
              What you will gain
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              <li>
                Understand the key ideas behind this course and how they apply
                in everyday work.
              </li>
              <li>
                Practice simple tools and methods that you can reuse after the
                training.
              </li>
              <li>
                Leave with clearer next steps for how to use what you learned in
                your role or business.
              </li>
            </ul>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-200">
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
              <div>
                <p className="text-[0.7rem] text-slate-400">Duration</p>
                <p>{course.duration}</p>
              </div>
              <div>
                <p className="text-[0.7rem] text-slate-400">Schedule</p>
                <p>{course.schedule}</p>
              </div>
              <div>
                <p className="text-[0.7rem] text-slate-400">Location</p>
                <p>{course.location}</p>
              </div>
              <div>
                <p className="text-[0.7rem] text-slate-400">Trainer</p>
                <p>{course.trainer}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          Registration call-to-action section
         ============================ */}
      <section className="space-y-4 rounded-2xl border border-indigo-600/60 bg-indigo-600/10 p-6">
        <header className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-50">
            Register your interest
          </h2>
          <p className="max-w-2xl text-sm text-slate-100">
            Share your details and we will contact you with dates, fees, and
            simple next steps to join this course.
          </p>
        </header>

        <CourseRegistrationModal
          courseId={course.id}
          courseTitle={course.title}
          courseCategory={course.category}
          courseDuration={course.duration}
          courseSchedule={course.schedule}
          courseLocation={course.location}
          courseTrainer={course.trainer}
        />
      </section>
    </div>
  );
}

