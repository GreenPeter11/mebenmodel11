// This file defines admin-only API endpoints for updating and deleting a single course.
// It belongs to the backend administration layer used by the /admin/courses page.

// ============================
// Imports
// ============================
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ============================
// Types
// ============================

type AdminCourseUpdateBody = {
  title?: string;
  slug?: string;
  category?: string;
  description?: string;
  duration?: string;
  schedule?: string;
  location?: string;
  trainer?: string;
};

type RouteParams = {
  params: {
    id: string;
  };
};

// ============================
// PUT handler (edit an existing course)
// ============================

export async function PUT(
  request: NextRequest,
  { params }: RouteParams,
) {
  const idNumber = Number(params.id);

  if (!Number.isInteger(idNumber)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid course id.",
      },
      { status: 400 },
    );
  }

  // ============================
  // Input validation
  // ============================
  let body: AdminCourseUpdateBody;

  try {
    body = (await request.json()) as AdminCourseUpdateBody;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON in request body.",
      },
      { status: 400 },
    );
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      {
        success: false,
        error: "No fields provided to update.",
      },
      { status: 400 },
    );
  }

  try {
    // ============================
    // Database save logic (update course)
    // ============================
    const updatedCourse = await prisma.course.update({
      where: { id: idNumber },
      data: body,
    });

    // ============================
    // Response handling
    // ============================
    return NextResponse.json(
      {
        success: true,
        message: "Course updated successfully.",
        data: updatedCourse,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in PUT /api/admin/courses/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update course. Please try again.",
      },
      { status: 500 },
    );
  }
}

// ============================
// DELETE handler (remove a course)
// ============================

export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams,
) {
  const idNumber = Number(params.id);

  if (!Number.isInteger(idNumber)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid course id.",
      },
      { status: 400 },
    );
  }

  try {
    // ============================
    // Database delete logic
    // ============================
    await prisma.course.delete({
      where: { id: idNumber },
    });

    // ============================
    // Response handling
    // ============================
    return NextResponse.json(
      {
        success: true,
        message: "Course deleted successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in DELETE /api/admin/courses/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete course. Please try again.",
      },
      { status: 500 },
    );
  }
}

