// This file defines the API endpoint for working with course data at /api/courses.
// It belongs to the backend data layer that serves course information to the frontend.

// ============================
// Imports
// ============================
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ============================
// Main logic
// ============================

// This endpoint supports:
// - GET /api/courses            → returns all courses
// - GET /api/courses?slug=...   → returns a single course by its slug

// ============================
// Request handling
// ============================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    // If a slug is provided, return a single course.
    if (slug) {
      // ============================
      // Database queries (single course by slug)
      // ============================
      const course = await prisma.course.findUnique({
        where: { slug },
      });

      // ============================
      // Error handling (course not found)
      // ============================
      if (!course) {
        return NextResponse.json(
          {
            success: false,
            error: "Course not found",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: course,
        },
        { status: 200 },
      );
    }

    // No slug provided; return all courses.
    // ============================
    // Database queries (all courses)
    // ============================
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data: courses,
      },
      { status: 200 },
    );
  } catch (error) {
    // ============================
    // Error handling (unexpected errors)
    // ============================
    console.error("Error in GET /api/courses:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while fetching courses.",
      },
      { status: 500 },
    );
  }
}

