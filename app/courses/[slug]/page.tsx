import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RegistrationForm from "./RegistrationForm";
import { ArrowLeft, Clock, MapPin, Calendar, User } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {course.category && (
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-3 tracking-wide uppercase">
                  {course.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{course.title}</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
              <User className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Instructor: {course.instructor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {course.image && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
              <div className="prose prose-indigo max-w-none text-gray-600 whitespace-pre-wrap">
                {course.description}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                <div className="bg-indigo-50 p-3 rounded-lg"><Clock className="w-6 h-6 text-indigo-600" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Duration</h4>
                  <p className="text-sm text-gray-500 mt-1">{course.duration || "Self-paced"}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                <div className="bg-indigo-50 p-3 rounded-lg"><Calendar className="w-6 h-6 text-indigo-600" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Schedule</h4>
                  <p className="text-sm text-gray-500 mt-1">{course.schedule || "Flexible"}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                <div className="bg-indigo-50 p-3 rounded-lg"><MapPin className="w-6 h-6 text-indigo-600" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Location</h4>
                  <p className="text-sm text-gray-500 mt-1">{course.location || "Online"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Registration Form */}
          <div className="lg:col-span-1 animate-in fade-in duration-700 delay-150">
            <div className="sticky top-8">
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Register Now</h3>
                <p className="text-gray-500 text-sm mb-6">Secure your spot in this course. No login required.</p>
                <RegistrationForm courseId={course.id} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
