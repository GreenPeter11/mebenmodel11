// app/api/admin/login/route.ts — Admin login endpoint.
// Verifies email + password against the Admin DB record, sets httpOnly JWT cookie.

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    let body: { email?: string; password?: string };

    try {
        body = (await request.json()) as { email?: string; password?: string };
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body." },
            { status: 400 }
        );
    }

    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { success: false, error: "Email and password are required." },
            { status: 400 }
        );
    }

    // Look up admin by email
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
        return NextResponse.json(
            { success: false, error: "Invalid email or password." },
            { status: 401 }
        );
    }

    // Verify bcrypt password
    const isValid = await bcrypt.compare(password, admin.hashedPassword);

    if (!isValid) {
        return NextResponse.json(
            { success: false, error: "Invalid email or password." },
            { status: 401 }
        );
    }

    // Sign JWT and set httpOnly cookie
    const token = signToken({ adminId: admin.id, email: admin.email });

    const response = NextResponse.json(
        { success: true, message: "Login successful." },
        { status: 200 }
    );

    response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
    });

    return response;
}
