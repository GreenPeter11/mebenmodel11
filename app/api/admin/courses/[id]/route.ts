// app/api/admin/courses/[id]/route.ts — Admin PUT and DELETE for a single course.
// Protected: requires valid admin_token cookie.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

type RouteParams = { params: { id: string } };

type AdminCourseUpdateBody = {
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

function requireAdmin(): boolean {
  const token = cookies().get("admin_token")?.value;
  return !!(token && verifyToken(token));
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!requireAdmin()) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const idNumber = Number(params.id);
  if (!Number.isInteger(idNumber)) {
    return NextResponse.json({ success: false, error: "Invalid course id." }, { status: 400 });
  }

  let body: AdminCourseUpdateBody;
  try {
    body = (await request.json()) as AdminCourseUpdateBody;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON." }, { status: 400 });
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json({ success: false, error: "No fields provided." }, { status: 400 });
  }

  try {
    const updatedCourse = await prisma.course.update({
      where: { id: idNumber },
      data: body,
    });
    return NextResponse.json(
      { success: true, message: "Course updated.", data: updatedCourse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/admin/courses/[id]:", error);
    return NextResponse.json({ success: false, error: "Failed to update course." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!requireAdmin()) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const idNumber = Number(params.id);
  if (!Number.isInteger(idNumber)) {
    return NextResponse.json({ success: false, error: "Invalid course id." }, { status: 400 });
  }

  try {
    await prisma.course.delete({ where: { id: idNumber } });
    return NextResponse.json({ success: true, message: "Course deleted." }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/admin/courses/[id]:", error);
    return NextResponse.json({ success: false, error: "Failed to delete course." }, { status: 500 });
  }
}
