// app/api/admin/courses/route.ts — Admin endpoints for listing and creating courses.
// Protected: requires valid admin_token cookie.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

function requireAdmin(): boolean {
  const token = cookies().get("admin_token")?.value;
  return !!(token && verifyToken(token));
}

type AdminCourseBody = {
  title?: string;
  slug?: string;
  category?: string;
  description?: string;
  duration?: string;
  schedule?: string;
  location?: string;
  trainer?: string;
  image?: string;
};

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/courses:", error);
    return NextResponse.json({ success: false, error: "Failed to load courses." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!requireAdmin()) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: AdminCourseBody;

  try {
    body = (await request.json()) as AdminCourseBody;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON." }, { status: 400 });
  }

  const { title, slug, category, description, duration, schedule, location, trainer, image } = body;

  if (!title || !slug || !category || !description || !duration || !schedule || !location || !trainer) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const course = await prisma.course.create({
      data: { title, slug, category, description, duration, schedule, location, trainer, image },
    });

    return NextResponse.json(
      { success: true, message: "Course created.", data: course },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/admin/courses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create course." },
      { status: 500 }
    );
  }
}
