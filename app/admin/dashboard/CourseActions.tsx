"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit } from "lucide-react";

export default function CourseActions({ courseId }: { courseId: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this course?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/course?id=${courseId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete course.");
            }
        } catch (err) {
            alert("Error deleting course.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-2 text-right">
            <button
                disabled={isDeleting}
                className="text-gray-400 hover:text-indigo-600 p-1 rounded transition-colors disabled:opacity-50"
                title="Edit"
            >
                <Edit className="w-4 h-4" />
            </button>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors disabled:opacity-50"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
