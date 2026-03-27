import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { courseSchema } from "@/lib/validation";

export async function POST(req: Request) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 });
    }
    try {
        const body = await req.json();
        const result = courseSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "Invalid data", details: result.error.flatten().fieldErrors }, { status: 400 });
        }
        const course = await prisma.course.create({ data: result.data });
        return NextResponse.json({ message: "Course created", course }, { status: 201 });
    } catch (error) {
        console.error("Course creation error:", error);
        return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 });
    }
    try {
        const body = await req.json();
        const { id, ...data } = body;
        if (!id) return NextResponse.json({ error: "Course ID is required" }, { status: 400 });

        const result = courseSchema.safeParse(data);
        if (!result.success) {
            return NextResponse.json({ error: "Invalid data", details: result.error.flatten().fieldErrors }, { status: 400 });
        }

        const course = await prisma.course.update({
            where: { id: String(id) },
            data: result.data,
        });
        return NextResponse.json({ message: "Course updated", course });
    } catch (error) {
        console.error("Course update error:", error);
        return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 });
    }
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Course ID is required" }, { status: 400 });

        await prisma.course.delete({ where: { id } });
        return NextResponse.json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Course deletion error:", error);
        return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
    }
}
