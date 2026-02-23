// This file defines the API endpoint for handling course registrations at /api/register.
// It belongs to the backend data layer that records learner interest for specific courses.

// ============================
// Imports
// ============================
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ============================
// Main logic
// ============================

type RegisterRequestBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  courseId?: number;
};

// ============================
// API logic (request handling)
// ============================

export async function POST(request: NextRequest) {
  // ============================
  // Input validation
  // ============================
  let body: RegisterRequestBody;

  try {
    body = (await request.json()) as RegisterRequestBody;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON in request body.",
      },
      { status: 400 },
    );
  }

  const { fullName, email, phone, courseId } = body;

  if (!fullName || !email || !phone || typeof courseId !== "number") {
    return NextResponse.json(
      {
        success: false,
        error:
          "Missing or invalid fields. Please provide fullName, email, phone, and courseId.",
      },
      { status: 400 },
    );
  }

  // Simple email shape check to avoid obvious mistakes (not full validation).
  if (!email.includes("@")) {
    return NextResponse.json(
      {
        success: false,
        error: "Please provide a valid email address.",
      },
      { status: 400 },
    );
  }

  try {
    // ============================
    // Database save logic
    // ============================
    const registration = await prisma.registration.create({
      data: {
        fullName,
        email,
        phone,
        courseId,
      },
    });

    // ============================
    // Response handling (success)
    // ============================
    return NextResponse.json(
      {
        success: true,
        message: "Registration saved successfully.",
        data: {
          id: registration.id,
          fullName: registration.fullName,
          email: registration.email,
          phone: registration.phone,
          courseId: registration.courseId,
          createdAt: registration.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    // ============================
    // Response handling (errors)
    // ============================
    console.error("Error in POST /api/register:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while saving the registration. Please try again later.",
      },
      { status: 500 },
    );
  }
}

