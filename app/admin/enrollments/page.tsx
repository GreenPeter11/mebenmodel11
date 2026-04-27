"use client";

// app/admin/enrollments/page.tsx — View all student enrollments with course info.

import { useEffect, useState } from "react";

type EnrollmentRow = {
    id: number;
    createdAt: string;
    student: { id: number; name: string; email: string; phone: string };
    course: { id: number; title: string; category: string };
};

async function fetchEnrollments(): Promise<EnrollmentRow[]> {
    const res = await fetch("/api/enrollments", { cache: "no-store" });
    const json = (await res.json()) as { success: boolean; data?: EnrollmentRow[] };
    if (!json.success || !json.data) throw new Error("Failed to load enrollments.");
    return json.data;
}

export default function AdminEnrollmentsPage() {
    const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEnrollments()
            .then(setEnrollments)
            .catch(() => setError("Could not load enrollments."))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <header className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-50">Enrollments</h1>
                <p className="text-sm text-slate-400">All student course registrations.</p>
            </header>

            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
                {isLoading ? (
                    <p className="px-6 py-8 text-sm text-slate-400">Loading enrollments...</p>
                ) : error ? (
                    <p className="px-6 py-8 text-sm text-rose-400">{error}</p>
                ) : enrollments.length === 0 ? (
                    <p className="px-6 py-8 text-sm text-slate-400">No enrollments yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-800 text-left">
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">#</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Student</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Email</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Course</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Category</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {enrollments.map((row, index) => (
                                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                                        <td className="px-4 py-3 font-medium text-slate-200">{row.student.name}</td>
                                        <td className="px-4 py-3 text-slate-400">{row.student.email}</td>
                                        <td className="px-4 py-3 text-slate-400">{row.student.phone}</td>
                                        <td className="px-4 py-3 text-indigo-300">{row.course.title}</td>
                                        <td className="px-4 py-3">
                                            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-slate-300">
                                                {row.course.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            {new Date(row.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
