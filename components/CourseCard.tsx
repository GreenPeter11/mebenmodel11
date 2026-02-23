// This file defines a CourseCard component for displaying course information with hover effects.
// It belongs to the shared UI components used in the courses listing and home page.

// ============================
// Imports
// ============================
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, User, Star } from "lucide-react";

// ============================
// Types
// ============================

type CourseCardProps = {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  instructor: string;
  rating: number;
  imageUrl: string;
  slug?: string;
};

// ============================
// Main logic
// ============================

// The CourseCard component displays course information with:
// - High-quality placeholder image from Unsplash
// - Hover animations (scale and shadow)
// - Course details (title, description, instructor, rating)
// - Smooth transitions for a premium feel

// ============================
// UI sections
// ============================

export function CourseCard(props: CourseCardProps) {
  const {
    title,
    description,
    category,
    duration,
    instructor,
    rating,
    imageUrl,
    slug,
  } = props;

  const content = (
    <motion.article
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Course image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Course content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
          {title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        {/* Course metadata */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span className="truncate">{instructor}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-700">{rating}</span>
          </div>
        </div>

        {/* View details link */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700">
            View Details →
          </span>
        </div>
      </div>
    </motion.article>
  );

  if (slug) {
    return <Link href={`/courses/${slug}`}>{content}</Link>;
  }

  return content;
}
