// This file defines a simple registration form that sends data to the /api/register endpoint.
// It belongs to the course details feature and is used on the /courses/[slug] page.

// ============================
// Imports
// ============================
"use client";

import { useState, type FormEvent, type ReactElement } from "react";

// ============================
// Types
// ============================

type CourseRegistrationFormProps = {
  courseId: number;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

// ============================
// Main logic
// ============================

// The form keeps its own state on the client. It:
// - Tracks input values and submission status.
// - Sends a POST request to /api/register when submitted.
// - Shows a simple success or error message based on the response.

// ============================
// UI and API logic
// ============================

export function CourseRegistrationForm(
  props: CourseRegistrationFormProps,
): ReactElement {
  const { courseId } = props;

  // ============================
  // Form state handling
  // ============================
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = status === "submitting";

  function handleChange(
    field: keyof FormValues,
    value: string,
  ): void {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // ============================
  // Form submission logic
  // ============================
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          courseId,
        }),
      });

      const json = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!response.ok || !json.success) {
        setStatus("error");
        setErrorMessage(
          json.error ??
            "We could not save your registration. Please try again.",
        );
        return;
      }

      setStatus("success");
      setValues({
        fullName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error while submitting registration:", error);
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or contact us directly.",
      );
    }
  }

  // ============================
  // Success and error feedback
  // ============================

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={handleSubmit}
    >
      <div className="md:col-span-2">
        <label
          htmlFor="fullName"
          className="mb-1 block text-xs font-medium text-slate-100"
        >
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={values.fullName}
          onChange={(event) => handleChange("fullName", event.target.value)}
          disabled={isSubmitting}
          className="block w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-xs font-medium text-slate-100"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          disabled={isSubmitting}
          className="block w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-xs font-medium text-slate-100"
        >
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          disabled={isSubmitting}
          className="block w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
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
          className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-sm shadow-indigo-800/60 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send registration request"}
        </button>
      </div>

      {status === "success" && (
        <p className="md:col-span-2 text-xs text-emerald-300">
          Thank you. Your registration has been received. We will contact you
          with next steps.
        </p>
      )}

      {status === "error" && errorMessage && (
        <p className="md:col-span-2 text-xs text-rose-300">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

