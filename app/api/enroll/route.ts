// app/api/enroll/route.ts — Student enrollment endpoint.
// Upserts a Student by email, then creates an Enrollment linking them to a course.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type EnrollBody = {
    name?: string;
    email?: string;
    phone?: string;
    courseId?: number;
};

export async function POST(request: NextRequest) {
    let body: EnrollBody;

    try {
        body = (await request.json()) as EnrollBody;
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body." },
            { status: 400 }
        );
    }

    const { name, email, phone, courseId } = body;

    if (!name || !email || !phone || typeof courseId !== "number") {
        return NextResponse.json(
            {
                success: false,
                error: "name, email, phone, and courseId are all required.",
            },
            { status: 400 }
        );
    }

    if (!email.includes("@")) {
        return NextResponse.json(
            { success: false, error: "Please provide a valid email address." },
            { status: 400 }
        );
    }

    try {
        // Upsert student — update phone/name if email already exists
        const student = await prisma.student.upsert({
            where: { email },
            update: { name, phone },
            create: { name, email, phone },
        });

        // Create enrollment (ignore duplicate if already enrolled)
        const enrollment = await prisma.enrollment.upsert({
            where: {
                studentId_courseId: { studentId: student.id, courseId },
            },
            update: {},
            create: { studentId: student.id, courseId },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Enrollment saved successfully.",
                data: { enrollmentId: enrollment.id, studentId: student.id, courseId },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST /api/enroll:", error);
        return NextResponse.json(
            { success: false, error: "Failed to save enrollment. Please try again." },
            { status: 500 }
        );
    }
}
