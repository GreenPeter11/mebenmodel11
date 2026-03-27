import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookOpen, Users, Plus } from "lucide-react";
import Link from "next/link";
import CourseActions from "./CourseActions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    requireAdmin();

    let coursesCount = 0, regsCount = 0, courses: any[] = [], registrations: any[] = [];

    try {
        [coursesCount, regsCount, courses, registrations] = await Promise.all([
            prisma.course.count(),
            prisma.registration.count(),
            prisma.course.findMany({ orderBy: { createdAt: "desc" } }),
            prisma.registration.findMany({ include: { course: true }, orderBy: { createdAt: "desc" } }),
        ]);
    } catch (err) {
        console.error("Database connection error on AdminDashboard:", err);
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Manage your education platform courses and view registrations.</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">{coursesCount}</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Total Courses</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">{regsCount}</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Total Registrations</p>
                </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900">Course Management</h3>
                    <Link href="/admin/courses/new" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                        + Add Course
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Instructor</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No courses found</td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                                        <td className="px-6 py-4 text-gray-600">{course.instructor}</td>
                                        <td className="px-6 py-4 text-gray-600">{course.category || "—"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <CourseActions courseId={course.id} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900">Recent Registrations</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Course</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {registrations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No registrations found</td>
                                </tr>
                            ) : (
                                registrations.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(reg.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{reg.fullName}</td>
                                        <td className="px-6 py-4 text-gray-600">{reg.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{reg.phone}</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">
                                            {reg.course?.title || "Unknown Course"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
