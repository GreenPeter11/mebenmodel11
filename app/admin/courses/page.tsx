"use client";

// app/admin/courses/page.tsx — Admin CRUD for courses (with image field + auth).

import { useEffect, useState, type FormEvent } from "react";

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
  image: string | null;
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
  image: string;
};

const EMPTY_FORM: CourseFormValues = {
  title: "", slug: "", category: "", description: "",
  duration: "", schedule: "", location: "", trainer: "", image: "",
};

type FormMode = "create" | "edit";

async function fetchAdminCourses(): Promise<AdminCourse[]> {
  const res = await fetch("/api/admin/courses", { cache: "no-store" });
  const json = (await res.json()) as { success: boolean; data?: AdminCourse[] };
  if (!json.success || !json.data) throw new Error("Failed to load courses.");
  return json.data;
}

async function createCourse(data: CourseFormValues): Promise<AdminCourse> {
  const res = await fetch("/api/admin/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = (await res.json()) as { success: boolean; data?: AdminCourse; error?: string };
  if (!res.ok || !json.success || !json.data) throw new Error(json.error ?? "Failed to create course.");
  return json.data;
}

async function updateCourse(id: number, data: CourseFormValues): Promise<AdminCourse> {
  const res = await fetch(`/api/admin/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = (await res.json()) as { success: boolean; data?: AdminCourse; error?: string };
  if (!res.ok || !json.success || !json.data) throw new Error(json.error ?? "Failed to update course.");
  return json.data;
}

async function deleteCourse(id: number): Promise<void> {
  const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!res.ok || !json.success) throw new Error(json.error ?? "Failed to delete course.");
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<CourseFormValues>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAdminCourses()
      .then((data) => { setCourses(data); setLoadError(null); })
      .catch(() => setLoadError("Could not load courses."))
      .finally(() => setIsLoading(false));
  }, []);

  function resetForm() {
    setFormMode("create"); setActiveCourseId(null);
    setFormValues(EMPTY_FORM); setFormError(null);
  }

  function startEditing(course: AdminCourse) {
    setFormMode("edit"); setActiveCourseId(course.id);
    setFormValues({
      title: course.title, slug: course.slug, category: course.category,
      description: course.description, duration: course.duration,
      schedule: course.schedule, location: course.location,
      trainer: course.trainer, image: course.image ?? "",
    });
    setFormError(null);
  }

  function handleChange(field: keyof CourseFormValues, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true); setFormError(null);
    try {
      if (formMode === "create") {
        const created = await createCourse(formValues);
        setCourses((prev) => [created, ...prev]);
        resetForm();
      } else if (formMode === "edit" && activeCourseId !== null) {
        const updated = await updateCourse(activeCourseId, formValues);
        setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        resetForm();
      }
    } catch (err) {
      setFormError(formMode === "create" ? "Could not create course." : "Could not update course.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this course?")) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      if (activeCourseId === id) resetForm();
    } catch {
      window.alert("Could not delete the course. Please try again.");
    }
  }

  const inputClass =
    "block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60";

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-50">Manage Courses</h1>
        <p className="text-sm text-slate-400">Create, edit, and delete training courses.</p>
      </header>

      {/* Course list */}
      <section className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-200">All Courses ({courses.length})</h2>
          <button type="button" onClick={resetForm} className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition">
            + Add new
          </button>
        </div>
        {isLoading ? (
          <p className="px-6 py-8 text-sm text-slate-400">Loading...</p>
        ) : loadError ? (
          <p className="px-6 py-8 text-sm text-rose-400">{loadError}</p>
        ) : courses.length === 0 ? (
          <p className="px-6 py-8 text-sm text-slate-400">No courses yet. Add one below.</p>
        ) : (
          <div className="divide-y divide-slate-800">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-200 truncate">{course.title}</p>
                    <span className="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-slate-400">
                      {course.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{course.duration} · {course.schedule}</p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button type="button" onClick={() => startEditing(course)}
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(course.id)}
                    className="text-xs font-medium text-rose-400 hover:text-rose-300 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Course form */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-200">
          {formMode === "create" ? "Add New Course" : "Edit Course"}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {[
            { id: "title", label: "Title", placeholder: "Course title" },
            { id: "slug", label: "Slug (URL)", placeholder: "business-planning-basics" },
            { id: "trainer", label: "Trainer", placeholder: "Lead trainer name" },
            { id: "duration", label: "Duration", placeholder: "e.g. 3 days" },
            { id: "schedule", label: "Schedule", placeholder: "e.g. Weekdays · Morning" },
          ].map(({ id, label, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-400">{label}</label>
              <input id={id} type="text" required value={formValues[id as keyof CourseFormValues]}
                onChange={(e) => handleChange(id as keyof CourseFormValues, e.target.value)}
                disabled={isSaving} className={inputClass} placeholder={placeholder} />
            </div>
          ))}

          {/* Category select */}
          <div>
            <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-400">Category</label>
            <select id="category" required value={formValues.category}
              onChange={(e) => handleChange("category", e.target.value)}
              disabled={isSaving}
              className={inputClass}>
              <option value="">Select category</option>
              <option value="Business">Business</option>
              <option value="Agriculture">Agriculture</option>
              <option value="IT">IT</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="location" className="mb-1 block text-xs font-medium text-slate-400">Location</label>
            <input id="location" type="text" required value={formValues.location}
              onChange={(e) => handleChange("location", e.target.value)}
              disabled={isSaving} className={inputClass} placeholder="Training center · City" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="image" className="mb-1 block text-xs font-medium text-slate-400">Image URL (optional)</label>
            <input id="image" type="url" value={formValues.image}
              onChange={(e) => handleChange("image", e.target.value)}
              disabled={isSaving} className={inputClass} placeholder="https://example.com/image.jpg" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="mb-1 block text-xs font-medium text-slate-400">Description</label>
            <textarea id="description" rows={4} required value={formValues.description}
              onChange={(e) => handleChange("description", e.target.value)}
              disabled={isSaving} className={inputClass}
              placeholder="Describe what learners will gain from this course." />
          </div>

          <div className="md:col-span-2 flex items-center justify-between gap-3 pt-1">
            {formError ? (
              <p className="text-xs text-rose-400">{formError}</p>
            ) : (
              <p className="text-xs text-slate-500">All fields except Image are required.</p>
            )}
            <div className="flex gap-2">
              {formMode === "edit" && (
                <button type="button" onClick={resetForm} disabled={isSaving}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition">
                  Cancel
                </button>
              )}
              <button type="submit" disabled={isSaving}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-60">
                {isSaving ? "Saving..." : formMode === "create" ? "Create Course" : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
