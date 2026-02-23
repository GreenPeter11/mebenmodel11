// This file defines admin-only API endpoints for listing registrations at /api/admin/registrations.
// It belongs to the backend administration layer that shows who has registered for which courses.

// ============================
// Imports
// ============================
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ============================
// GET handler (list registrations with course information)
// ============================

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: registrations,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in GET /api/admin/registrations:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load registrations.",
      },
      { status: 500 },
    );
  }
}

