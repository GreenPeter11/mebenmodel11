// middleware.ts — Protects all /admin/* routes except /admin/login.
// Reads the admin_token httpOnly cookie and verifies the JWT.
// Unauthenticated requests are redirected to /admin/login.

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow login page through without auth check
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    const token = request.cookies.get("admin_token")?.value;

    if (!token || !verifyToken(token)) {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
