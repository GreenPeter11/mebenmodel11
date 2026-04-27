// app/api/courses/route.ts — Public GET endpoint for all courses (with optional category filter).

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");

  try {
    // Single course by slug
    if (slug) {
      const course = await prisma.course.findUnique({ where: { slug } });

      if (!course) {
        return NextResponse.json(
          { success: false, error: "Course not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: course }, { status: 200 });
    }

    // All courses — optionally filtered by category
    const courses = await prisma.course.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/courses:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while fetching courses." },
      { status: 500 }
    );
  }
}
