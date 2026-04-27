// components/CourseRegistrationForm.tsx — Enrollment form sending data to /api/enroll.

"use client";

import { useState, type FormEvent, type ReactElement } from "react";

type CourseRegistrationFormProps = {
  courseId: number;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function CourseRegistrationForm(
  props: CourseRegistrationFormProps,
): ReactElement {
  const { courseId } = props;

  const [values, setValues] = useState<FormValues>({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = status === "submitting";

  function handleChange(field: keyof FormValues, value: string): void {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          courseId,
        }),
      });

      const json = (await response.json()) as { success: boolean; error?: string };

      if (!response.ok || !json.success) {
        setStatus("error");
        setErrorMessage(json.error ?? "We could not save your registration. Please try again.");
        return;
      }

      setStatus("success");
      setValues({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error while submitting enrollment:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly.");
    }
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="md:col-span-2">
        <label htmlFor="name" className="mb-1 block text-xs font-medium text-slate-100">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          disabled={isSubmitting}
          className="block w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-medium text-slate-100">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={isSubmitting}
          className="block w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-xs font-medium text-slate-100">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          disabled={isSubmitting}
          className="block w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Include country code if needed"
        />
      </div>

      <div className="md:col-span-2 flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-200">
          We will only use your contact details to follow up about this course.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Enroll now"}
        </button>
      </div>

      {status === "success" && (
        <p className="md:col-span-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          ✅ Thank you! Your enrollment has been saved. We will contact you with next steps.
        </p>
      )}

      {status === "error" && errorMessage && (
        <p className="md:col-span-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
