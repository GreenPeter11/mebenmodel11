import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    category: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    duration: z.string().optional(),
    schedule: z.string().optional(),
    location: z.string().optional(),
    instructor: z.string().min(1, "Instructor is required"),
    image: z.string().optional(),
});

export const registrationSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(1, "Phone is required"),
    courseId: z.string().min(1, "Course ID is required"),
});
