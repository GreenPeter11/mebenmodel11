import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Users, Award, TrendingUp, Search, ArrowRight, User, Clock, Star, Quote } from "lucide-react";

export const metadata = { title: "Explore Courses | Education Platform" };
export const dynamic = "force-dynamic";

export default async function HomePage() {
  let courses: any[] = [];
  try {
    courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 3 // Only showing featured 3 courses like the design
    });
  } catch (err) {
    console.error("Database connection error on HomePage:", err);
  }

  // Fallback courses if db fails or no courses exist, just to show the UI
  const displayCourses = courses.length > 0 ? courses : [
    {
      id: "1",
      slug: "business-planning-foundations",
      title: "Business Planning Foundations",
      description: "Master the essentials of business planning and strategy development for sustainable growth.",
      category: "Business",
      instructor: "Jane Doe",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
      rating: 4.8,
      duration: "3 days",
    },
    {
      id: "2",
      slug: "essential-computer-skills",
      title: "Essential Computer Skills",
      description: "Build strong digital foundations with practical computer skills for the modern workplace.",
      category: "IT",
      instructor: "John Smith",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      rating: 4.9,
      duration: "4 evenings",
    },
    {
      id: "3",
      slug: "smart-farming-essentials",
      title: "Smart Farming Essentials",
      description: "Learn modern agricultural practices and improve farm productivity with data-driven insights.",
      category: "Agriculture",
      instructor: "Maria Garcia",
      image: "https://images.unsplash.com/photo-1592982537447-6f2cf3315fa7?auto=format&fit=crop&q=80&w=800",
      rating: 4.7,
      duration: "3 days",
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4F46E5] to-[#D946EF] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-sm">
            Transform Your Skills,<br />Transform Your Future
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Join thousands of learners mastering practical skills in Business, IT, and Agriculture. Expert-led courses designed for real-world impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses" className="bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all font-semibold rounded-full px-8 py-3.5 flex items-center gap-2 backdrop-blur-md shadow-lg w-full sm:w-auto">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/courses" className="bg-transparent hover:bg-white/10 text-white border-2 border-white transition-all font-semibold rounded-full px-8 py-3 w-full sm:w-auto">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">Why Choose Mebenmodel?</h2>
          <p className="text-gray-500 text-lg">Practical training designed for real-world success</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Expert-Led Courses",
              desc: "Learn from industry professionals with years of practical experience.",
            },
            {
              icon: Users,
              title: "Interactive Learning",
              desc: "Engage with hands-on exercises and real-world case studies.",
            },
            {
              icon: Award,
              title: "Certified Programs",
              desc: "Earn recognized certificates that boost your career prospects.",
            },
            {
              icon: TrendingUp,
              title: "Career Growth",
              desc: "Skills that translate directly to workplace success and advancement.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all border border-gray-100 flex flex-col items-start">
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">Featured Courses</h2>
            <p className="text-gray-500 text-lg">Start your learning journey with our most popular programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCourses.map((course: any) => (
              <div key={course.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 pb-2">
                <div className="aspect-[4/3] bg-indigo-50 relative overflow-hidden">
                  <img src={course.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />

                  {course.category && (
                    <div className="absolute top-4 left-4 bg-indigo-600 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm">
                      {course.category}
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration || "4 weeks"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{course.instructor || "Expert"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-gray-700">{course.rating || "4.8"}</span>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="mt-auto flex items-center text-sm text-indigo-600 font-semibold group/btn"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">What Our Students Say</h2>
          <p className="text-gray-500 text-lg">Join thousands of satisfied learners transforming their careers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The business planning course transformed how I approach my work. Practical, clear, and immediately applicable.",
              author: "Sarah Johnson",
              role: "Small Business Owner"
            },
            {
              quote: "Best investment in my professional development. The instructors are knowledgeable and the content is top-notch.",
              author: "Michael Chen",
              role: "IT Professional"
            },
            {
              quote: "These courses helped me modernize my farming practices. Highly recommend to anyone in agriculture.",
              author: "David Williams",
              role: "Farm Manager"
            }
          ].map((test, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
              <Quote className="w-10 h-10 text-indigo-500 mb-6 opacity-80" />
              <p className="text-gray-600 mb-8 flex-1 leading-relaxed">
                {test.quote}
              </p>
              <div>
                <h4 className="font-bold text-gray-900">{test.author}</h4>
                <p className="text-sm text-gray-500">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#4F46E5] to-[#9333EA] text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Ready to Start Learning?</h2>
          <p className="text-indigo-100 text-lg mb-10">Join thousands of learners advancing their careers today</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses" className="bg-white text-indigo-600 hover:bg-gray-50 transition-colors font-bold rounded-full px-10 py-3.5 shadow-lg w-full sm:w-auto">
              Get Started
            </Link>
            <Link href="/contact" className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold transition-all rounded-full px-10 py-3.5 w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
