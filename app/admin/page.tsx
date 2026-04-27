// app/admin/page.tsx — Admin dashboard overview with stats and recent enrollments.
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { BookOpen, Users, TrendingUp } from "lucide-react";

async function getStats() {
    try {
        const courseCount = await prisma.course.count();

        // Use raw query for enrollment stats so build succeeds even if migration is pending
        const enrollmentCountResult = await prisma.$queryRawUnsafe<[{ count: bigint }]>(
            `SELECT COUNT(*) as count FROM "Enrollment"`
        );
        const enrollmentCount = Number(enrollmentCountResult[0]?.count ?? 0);

        type RecentRow = {
            id: number;
            createdAt: Date;
            studentName: string;
            studentEmail: string;
            courseTitle: string;
        };

        const recentEnrollments = await prisma.$queryRawUnsafe<RecentRow[]>(`
      SELECT e.id, e."createdAt", s.name AS "studentName", s.email AS "studentEmail", c.title AS "courseTitle"
      FROM "Enrollment" e
      JOIN "Student" s ON s.id = e."studentId"
      JOIN "Course" c ON c.id = e."courseId"
      ORDER BY e."createdAt" DESC
      LIMIT 5
    `);

        return { courseCount, enrollmentCount, recentEnrollments };
    } catch {
        return { courseCount: 0, enrollmentCount: 0, recentEnrollments: [] };
    }
}

type RecentRow = {
    id: number;
    createdAt: Date;
    studentName: string;
    studentEmail: string;
    courseTitle: string;
};

export default async function AdminDashboardPage() {
    const { courseCount, enrollmentCount, recentEnrollments } = await getStats();

    return (
        <div className="space-y-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-50">Dashboard</h1>
                <p className="text-sm text-slate-400">Welcome back, admin.</p>
            </header>

            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600/20">
                        <BookOpen className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">Total Courses</p>
                        <p className="text-2xl font-bold text-slate-50">{courseCount}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600/20">
                        <Users className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">Total Enrollments</p>
                        <p className="text-2xl font-bold text-slate-50">{enrollmentCount}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-600/20">
                        <TrendingUp className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">Avg. per Course</p>
                        <p className="text-2xl font-bold text-slate-50">
                            {courseCount > 0 ? (enrollmentCount / courseCount).toFixed(1) : "0"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent enrollments */}
            <section className="rounded-xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 px-6 py-4">
                    <h2 className="text-sm font-semibold text-slate-200">Recent Enrollments</h2>
                </div>

                {(recentEnrollments as RecentRow[]).length === 0 ? (
                    <p className="px-6 py-8 text-sm text-slate-400">No enrollments yet.</p>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {(recentEnrollments as RecentRow[]).map((row) => (
                            <div key={row.id} className="flex items-center justify-between gap-4 px-6 py-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-200">{row.studentName}</p>
                                    <p className="text-xs text-slate-400">{row.studentEmail}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-medium text-indigo-300">{row.courseTitle}</p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(row.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
