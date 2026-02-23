// This file defines a FeatureCard component for displaying key features with icons and hover effects.
// It belongs to the shared UI components used on the home page features section.

// ============================
// Imports
// ============================
"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

// ============================
// Types
// ============================

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
};

// ============================
// Main logic
// ============================

// The FeatureCard component displays a feature with:
// - Icon from Lucide
// - Title and description
// - Hover animations (lift and shadow)
// - Staggered entrance animations

// ============================
// UI sections
// ============================

export function FeatureCard(props: FeatureCardProps) {
  const { icon: Icon, title, description, delay = 0 } = props;

  return (
    <motion.div
      className="group rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
    >
      <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
