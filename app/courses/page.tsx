import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, User, ArrowRight } from "lucide-react";

export const metadata = { title: "All Courses | Education Platform" };
export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Browse our complete catalog of professional training courses.</p>
        </header>

        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No courses available</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col group">
                <div className="aspect-video bg-indigo-50 relative overflow-hidden">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                      <BookOpen className="w-12 h-12 text-indigo-300" />
                    </div>
                  )}
                  {course.category && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-700">
                      {course.category}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <User className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                    {course.description}
                  </p>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors group/btn"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
