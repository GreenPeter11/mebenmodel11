// This file defines the loading state for the courses page while data is being fetched.
// It belongs to the /courses route segment and is shown automatically by Next.js during route transitions.

// ============================
// Imports
// ============================

// There are no imports yet; this file uses simple placeholder elements only.

// ============================
// UI sections (loading skeleton)
// ============================

export default function CoursesLoading() {
  return (
    <div className="flex w-full flex-col gap-8">
      <section className="space-y-2">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-800" />
        <div className="h-4 w-72 animate-pulse rounded bg-slate-800" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
              <div className="h-3 w-20 animate-pulse rounded bg-slate-800" />
              <div className="h-3 w-full animate-pulse rounded bg-slate-800" />
            </div>
            <div className="h-7 w-24 animate-pulse rounded-full bg-slate-800" />
          </div>
        ))}
      </section>
    </div>
  );
}

