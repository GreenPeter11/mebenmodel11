// This file defines the admin login page that is intended for administrators only.
// It belongs to the internal administration section at the /admin/login route.

// ============================
// Imports
// ============================
"use client";

import { useState, type FormEvent } from "react";

// ============================
// Main logic
// ============================

// The login flow on this page is intentionally simple and hardcoded:
// - The form collects an email and password from the administrator.
// - On submit, the values are checked against fixed credentials in this file.
// - If the values match, we show a basic "login successful" message.
// - If they do not match, we show a clear error message.
// This can later be replaced with a real authentication system.

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "changeme123";

type LoginStatus = "idle" | "submitting" | "success" | "error";

// ============================
// UI sections
// ============================

export default function AdminLoginPage() {
  // ============================
  // Form state handling for login
  // ============================
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = status === "submitting";

  // ============================
  // Login flow and form submission
  // ============================
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage(null);

    // Simulate a simple check against hardcoded credentials.
    // In the future, this can be replaced with a call to a secure authentication API.
    await new Promise((resolve) => setTimeout(resolve, 400));

    const trimmedEmail = email.trim().toLowerCase();
    const isValid =
      trimmedEmail === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD;

    if (!isValid) {
      setStatus("error");
      setErrorMessage("Invalid email or password. Please try again.");
      return;
    }

    setStatus("success");
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm shadow-slate-900/40">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
          Admin area
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Administrator login
        </h1>
        <p className="text-xs text-slate-300">
          This page is for authorized administrators only. Use the email and
          password provided to you by the system owner.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-slate-100"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="admin@example.com"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-slate-100"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
            className="block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Enter admin password"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-800/60 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Checking..." : "Log in"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-xs text-emerald-300">
          Login successful. You can now access the admin tools once they are
          available.
        </p>
      )}

      {status === "error" && errorMessage && (
        <p className="text-xs text-rose-300">{errorMessage}</p>
      )}
    </div>
  );
}

