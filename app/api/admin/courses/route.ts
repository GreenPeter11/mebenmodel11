// This file defines admin-only API endpoints for managing courses at /api/admin/courses.
// It belongs to the backend administration layer that lets admins create and list courses.

// ============================
// Imports
// ============================
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ============================
// Types
// ============================

type AdminCourseBody = {
  title?: string;
  slug?: string;
  category?: string;
  description?: string;
  duration?: string;
  schedule?: string;
  location?: string;
  trainer?: string;
};

// ============================
// GET handler (list all courses for admins)
// ============================

export async function GET() {
  try {
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
    console.error("Error in GET /api/admin/courses:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load courses.",
      },
      { status: 500 },
    );
  }
}

// ============================
// POST handler (create a new course)
// ============================

export async function POST(request: NextRequest) {
  // ============================
  // Input validation
  // ============================
  let body: AdminCourseBody;

  try {
    body = (await request.json()) as AdminCourseBody;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON in request body.",
      },
      { status: 400 },
    );
  }

  const { title, slug, category, description, duration, schedule, location, trainer } =
    body;

  if (
    !title ||
    !slug ||
    !category ||
    !description ||
    !duration ||
    !schedule ||
    !location ||
    !trainer
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Missing required fields. Please provide title, slug, category, description, duration, schedule, location, and trainer.",
      },
      { status: 400 },
    );
  }

  try {
    // ============================
    // Database save logic (create course)
    // ============================
    const course = await prisma.course.create({
      data: {
        title,
        slug,
        category,
        description,
        duration,
        schedule,
        location,
        trainer,
      },
    });

    // ============================
    // Response handling
    // ============================
    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully.",
        data: course,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/admin/courses:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create course. Please try again.",
      },
      { status: 500 },
    );
  }
}

