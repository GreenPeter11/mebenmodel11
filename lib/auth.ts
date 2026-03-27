import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "admin_session";

export function setAdminSession(email: string) {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || email !== adminEmail) {
        return false;
    }
    cookies().set(SESSION_COOKIE_NAME, "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
    });
    return true;
}

export function clearAdminSession() {
    cookies().delete(SESSION_COOKIE_NAME);
}

export function isAuthenticated() {
    return cookies().get(SESSION_COOKIE_NAME)?.value === "true";
}

export function requireAdmin() {
    if (!isAuthenticated()) {
        redirect("/admin/login");
    }
}
