// This file defines the admin courses page where administrators can manage course records.
// It belongs to the internal administration section and is accessible at the /admin/courses route.

// ============================
// Imports
// ============================
"use client";

import { useEffect, useState, type FormEvent } from "react";

// ============================
// Types
// ============================

type AdminCourse = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  schedule: string;
  location: string;
  trainer: string;
  createdAt: string;
};

type CourseFormValues = {
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  schedule: string;
  location: string;
  trainer: string;
};

type FormMode = "create" | "edit";

// ============================
// Main logic
// ============================

// This page allows admins to:
// - View the list of existing courses.
// - Add a new course using the form.
// - Select a course to edit and update its details.
// - Delete a course if it is no longer needed.
// The logic is kept simple and uses clear API helpers and form state.

// ============================
// Helper functions (API interaction)
// ============================

// These helpers wrap API calls so the rest of the component remains easy to read.

async function fetchAdminCourses(): Promise<AdminCourse[]> {
  const response = await fetch("/api/admin/courses", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load courses.");
  }

  const json = (await response.json()) as {
    success: boolean;
    data?: AdminCourse[];
  };

  if (!json.success || !json.data) {
    throw new Error("Failed to load courses.");
  }

  return json.data;
}

async function createCourse(data: CourseFormValues): Promise<AdminCourse> {
  const response = await fetch("/api/admin/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = (await response.json()) as {
    success: boolean;
    data?: AdminCourse;
    error?: string;
  };

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Failed to create course.");
  }

  return json.data;
}

async function updateCourse(
  id: number,
  data: CourseFormValues,
): Promise<AdminCourse> {
  const response = await fetch(`/api/admin/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = (await response.json()) as {
    success: boolean;
    data?: AdminCourse;
    error?: string;
  };

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Failed to update course.");
  }

  return json.data;
}

async function deleteCourse(id: number): Promise<void> {
  const response = await fetch(`/api/admin/courses/${id}`, {
    method: "DELETE",
  });

  const json = (await response.json()) as {
    success: boolean;
    error?: string;
  };

  if (!response.ok || !json.success) {
    throw new Error(json.error ?? "Failed to delete course.");
  }
}

// ============================
// UI sections and form logic
// ============================

export default function AdminCoursesPage() {
  // ============================
  // Form logic and local state
  // ============================
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<FormMode>("create");
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<CourseFormValues>({
    title: "",
    slug: "",
    category: "",
    description: "",
    duration: "",
    schedule: "",
    location: "",
    trainer: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // ============================
  // Initial load of course data
  // ============================
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminCourses();
        setCourses(data);
        setLoadError(null);
      } catch (error) {
        console.error(error);
        setLoadError("Could not load courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, []);

  function resetFormToCreate() {
    setFormMode("create");
    setActiveCourseId(null);
    setFormValues({
      title: "",
      slug: "",
      category: "",
      description: "",
      duration: "",
      schedule: "",
      location: "",
      trainer: "",
    });
    setFormError(null);
  }

  function startEditing(course: AdminCourse) {
    setFormMode("edit");
    setActiveCourseId(course.id);
    setFormValues({
      title: course.title,
      slug: course.slug,
      category: course.category,
      description: course.description,
      duration: course.duration,
      schedule: course.schedule,
      location: course.location,
      trainer: course.trainer,
    });
    setFormError(null);
  }

  function handleFormChange(
    field: keyof CourseFormValues,
    value: string,
  ) {
    setFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // ============================
  // API interaction from the form
  // ============================
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setFormError(null);

    try {
      if (formMode === "create") {
        const created = await createCourse(formValues);
        setCourses((previous) => [created, ...previous]);
        resetFormToCreate();
      } else if (formMode === "edit" && activeCourseId !== null) {
        const updated = await updateCourse(activeCourseId, formValues);
        setCourses((previous) =>
          previous.map((course) =>
            course.id === updated.id ? updated : course,
          ),
        );
      }
    } catch (error) {
      console.error(error);
      setFormError(
        formMode === "create"
          ? "Could not create course. Please check the fields and try again."
          : "Could not update course. Please check the fields and try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteCourse(id: number) {
    // Keep the delete flow simple: ask for confirmation, then call the API.
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );
    if (!confirmed) {
      return;
    }

    try {
      await deleteCourse(id);
      setCourses((previous) =>
        previous.filter((course) => course.id !== id),
      );

      if (activeCourseId === id) {
        resetFormToCreate();
      }
    } catch (error) {
      console.error(error);
      window.alert("Could not delete the course. Please try again.");
    }
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {/* ============================
          Header section (page purpose)
         ============================ */}
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
          Admin area
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Manage courses
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page allows administrators to add new courses, edit existing
          details, and remove courses that are no longer offered.
        </p>
      </header>

      {/* ============================
          UI section: list of courses
         ============================ */}
      <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm shadow-slate-900/40">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-50">
            Current courses
          </h2>
          <button
            type="button"
            onClick={resetFormToCreate}
            className="text-xs font-medium text-indigo-300 underline-offset-4 hover:underline"
          >
            Add new course
          </button>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-300">Loading courses...</p>
        ) : loadError ? (
          <p className="text-xs text-rose-300">{loadError}</p>
        ) : courses.length === 0 ? (
          <p className="text-xs text-slate-300">
            No courses have been created yet. Use the form below to add the
            first course.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {course.title}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-slate-200">
                      {course.category}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs text-slate-300">
                    {course.description}
                  </p>
                  <p className="text-[0.7rem] text-slate-400">
                    {course.duration} · {course.schedule}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => startEditing(course)}
                    className="text-[0.7rem] font-medium text-indigo-300 underline-offset-4 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-[0.7rem] font-medium text-rose-300 underline-offset-4 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ============================
          UI section: course form
         ============================ */}
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <header className="space-y-1">
          <h2 className="text-sm font-semibold text-slate-50">
            {formMode === "create" ? "Add a new course" : "Edit course"}
          </h2>
          <p className="text-xs text-slate-300">
            Fill in the fields below and save. All fields are required so that
            learners have clear information on the public site.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={formValues.title}
              onChange={(event) =>
                handleFormChange("title", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="Course title"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Slug (URL)
            </label>
            <input
              id="slug"
              type="text"
              required
              value={formValues.slug}
              onChange={(event) =>
                handleFormChange("slug", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="business-planning-foundations"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              required
              value={formValues.category}
              onChange={(event) =>
                handleFormChange("category", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="Business, IT, or Agriculture"
            />
          </div>

          <div>
            <label
              htmlFor="trainer"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Trainer
            </label>
            <input
              id="trainer"
              type="text"
              required
              value={formValues.trainer}
              onChange={(event) =>
                handleFormChange("trainer", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="Lead Trainer name"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Duration
            </label>
            <input
              id="duration"
              type="text"
              required
              value={formValues.duration}
              onChange={(event) =>
                handleFormChange("duration", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="For example: 3 days"
            />
          </div>

          <div>
            <label
              htmlFor="schedule"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Schedule
            </label>
            <input
              id="schedule"
              type="text"
              required
              value={formValues.schedule}
              onChange={(event) =>
                handleFormChange("schedule", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="For example: Weekdays · Morning sessions"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="location"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              required
              value={formValues.location}
              onChange={(event) =>
                handleFormChange("location", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="For example: Training center · City location"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-1 block text-xs font-medium text-slate-100"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              required
              value={formValues.description}
              onChange={(event) =>
                handleFormChange("description", event.target.value)
              }
              disabled={isSaving}
              className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="Describe what the learner can expect from this course in simple language."
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between gap-2 pt-2">
            {formError ? (
              <p className="text-xs text-rose-300">{formError}</p>
            ) : (
              <p className="text-xs text-slate-300">
                Check that the slug is unique and that all fields are filled in
                clearly.
              </p>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-sm shadow-indigo-800/60 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving
                ? "Saving..."
                : formMode === "create"
                ? "Create course"
                : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

