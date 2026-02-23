// This file defines the admin registrations page that shows a list of registered trainees.
// It belongs to the internal administration section and is accessible at the /admin/registrations route.

// ============================
// Imports
// ============================
"use client";

import { useEffect, useState } from "react";

// ============================
// Types
// ============================

type AdminRegistration = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  course: {
    id: number;
    title: string;
  };
};

// ============================
// Helper functions (API interaction)
// ============================

// This helper wraps the call to the admin registrations API so the component stays easy to read.
async function fetchAdminRegistrations(): Promise<AdminRegistration[]> {
  const response = await fetch("/api/admin/registrations", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load registrations.");
  }

  const json = (await response.json()) as {
    success: boolean;
    data?: AdminRegistration[];
  };

  if (!json.success || !json.data) {
    throw new Error("Failed to load registrations.");
  }

  return json.data;
}

// ============================
// Helper functions (CSV export logic)
// ============================

// This helper turns the current registrations into a CSV file and triggers a browser download.
// The logic is kept small and clear:
// - Build an array of rows, starting with a header row.
// - Escape values so commas and quotes do not break the CSV format.
// - Create a Blob and use a temporary link element to start the download.
function exportRegistrationsToCsv(registrations: AdminRegistration[]) {
  if (registrations.length === 0) {
    return;
  }

  const headers = [
    "Course title",
    "Full name",
    "Email",
    "Phone",
    "Registration date",
  ];

  function escapeCsvValue(value: string): string {
    const needsQuotes =
      value.includes(",") || value.includes('"') || value.includes("\n");
    let safe = value.replace(/"/g, '""');
    if (needsQuotes) {
      safe = `"${safe}"`;
    }
    return safe;
  }

  const rows = registrations.map((registration) => [
    registration.course?.title ?? "",
    registration.fullName,
    registration.email,
    registration.phone,
    new Date(registration.createdAt).toISOString(),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => escapeCsvValue(String(cell))).join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "registrations.csv";
  link.click();

  URL.revokeObjectURL(url);
}

// ============================
// UI sections and main page logic
// ============================

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // ============================
  // Initial data load
  // ============================
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminRegistrations();
        setRegistrations(data);
        setLoadError(null);
      } catch (error) {
        console.error(error);
        setLoadError("Could not load registrations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, []);

  // ============================
  // CSV export handler
  // ============================
  async function handleExportClick() {
    if (registrations.length === 0 || isExporting) {
      return;
    }

    setIsExporting(true);
    try {
      exportRegistrationsToCsv(registrations);
    } finally {
      setIsExporting(false);
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
          Registrations
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page shows registered trainees, including which course they
          selected and how to contact them.
        </p>
      </header>

      {/* ============================
          Actions section (CSV export)
         ============================ */}
      <section className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-300">
          {isLoading
            ? "Loading registrations..."
            : registrations.length === 0
            ? "No registrations have been recorded yet."
            : `Showing ${registrations.length} registration${
                registrations.length === 1 ? "" : "s"
              }.`}
        </p>

        <button
          type="button"
          onClick={handleExportClick}
          disabled={registrations.length === 0 || isExporting || isLoading}
          className="inline-flex items-center justify-center rounded-full border border-indigo-400 px-4 py-1.5 text-xs font-medium text-indigo-100 shadow-sm shadow-slate-900/50 transition hover:bg-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isExporting ? "Exporting..." : "Export CSV"}
        </button>
      </section>

      {/* ============================
          Table section (registered trainees)
         ============================ */}
      <section className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-900/40">
        {loadError ? (
          <p className="text-xs text-rose-300">{loadError}</p>
        ) : registrations.length === 0 && !isLoading ? (
          <p className="text-xs text-slate-300">
            There are no registrations yet. Once learners register for courses,
            they will appear here.
          </p>
        ) : (
          <table className="min-w-full border-separate border-spacing-y-2 text-left text-xs text-slate-100">
            <thead className="text-[0.7rem] uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-3 py-1.5">Course title</th>
                <th className="px-3 py-1.5">Full name</th>
                <th className="px-3 py-1.5">Email</th>
                <th className="px-3 py-1.5">Phone</th>
                <th className="px-3 py-1.5">Registration date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr
                  key={registration.id}
                  className="rounded-xl bg-slate-950/60"
                >
                  <td className="px-3 py-2 align-top text-xs text-slate-100">
                    {registration.course?.title ?? "Unknown course"}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-slate-100">
                    {registration.fullName}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-slate-300">
                    {registration.email}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-slate-300">
                    {registration.phone}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-slate-400">
                    {new Date(registration.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

