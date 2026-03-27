import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Search, ArrowRight, User } from "lucide-react";

export const metadata = { title: "Explore Courses | Education Platform" };
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-in slide-in-from-bottom-4 duration-700">
            Elevate Your Career with Premium Courses
          </h1>
          <p className="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-in fade-in duration-1000 delay-150">
            Join hundreds of learners advancing their skills in technology, business, and agriculture.
          </p>
          <div className="relative max-w-xl mx-auto animate-in zoom-in-95 duration-500 delay-300">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border-none rounded-full text-gray-900 focus:ring-4 focus:ring-indigo-300 shadow-xl"
              placeholder="Search courses..."
            />
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="text-gray-500 mt-2">Browse our latest and most popular offerings.</p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No courses available yet</h3>
            <p className="text-gray-500 mt-1">Check back soon for new learning opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group">
                <div className="aspect-video bg-indigo-50 relative overflow-hidden">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                      <BookOpen className="w-12 h-12 text-indigo-300" />
                    </div>
                  )}
                  {course.category && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-700 shadow-sm">
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
      </section>
    </div>
  );
}
