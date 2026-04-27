// app/api/enrollments/route.ts — Admin-only endpoint to list all enrollments.
// Returns enrollment records with student name/email/phone and course title.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const enrollments = await prisma.enrollment.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                student: {
                    select: { id: true, name: true, email: true, phone: true },
                },
                course: {
                    select: { id: true, title: true, category: true },
                },
            },
        });

        return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/enrollments:", error);
        return NextResponse.json(
            { success: false, error: "Failed to load enrollments." },
            { status: 500 }
        );
    }
}
