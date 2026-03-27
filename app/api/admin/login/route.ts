import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        if (setAdminSession(email)) {
            return NextResponse.json({ success: true, message: "Logged in successfully" });
        } else {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
