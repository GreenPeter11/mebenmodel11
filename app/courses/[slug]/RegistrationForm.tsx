"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function RegistrationForm({ courseId }: { courseId: string }) {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            fullName: formData.get("fullName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            courseId,
        };

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                const result = await res.json();
                setError(result.error || "Failed to register");
                setStatus("idle");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            setStatus("idle");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
                <h4 className="text-lg font-bold mb-1">Registration Successful!</h4>
                <p className="text-sm text-emerald-700">A confirmation email has been sent to your inbox. We look forward to seeing you.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                    name="fullName"
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="John Doe"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="john@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-2 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 hover:shadow-lg focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70 flex justify-center items-center"
            >
                {status === "loading" ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                    "Complete Registration"
                )}
            </button>
        </form>
    );
}
