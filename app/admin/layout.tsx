"use client";

// app/admin/layout.tsx — Admin shell with sidebar navigation and logout button.

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { LayoutDashboard, BookOpen, Users, LogOut } from "lucide-react";

const navLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/courses", label: "Courses", icon: BookOpen, exact: false },
    { href: "/admin/enrollments", label: "Enrollments", icon: Users, exact: false },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    async function handleLogout() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            {/* Sidebar */}
            <aside className="flex w-64 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-900">
                <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
                    <span className="text-lg font-bold text-white">Mebenmodel</span>
                    <span className="rounded bg-indigo-600/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                        Admin
                    </span>
                </div>

                <nav className="flex flex-1 flex-col gap-1 p-4">
                    {navLinks.map(({ href, label, icon: Icon, exact }) => {
                        const isActive = exact ? pathname === href : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                        ? "bg-indigo-600/20 text-indigo-300"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                    }`}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-800 p-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
                    >
                        <LogOut className="h-4 w-4 flex-shrink-0" />
                        Log out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex flex-1 flex-col overflow-y-auto">
                <div className="flex-1 p-8">{children}</div>
            </main>
        </div>
    );
}
