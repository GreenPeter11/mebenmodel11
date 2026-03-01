// This file defines a reusable Button component with consistent styling and variants.
// It belongs to the shared UI components used across the application.

// ============================
// Imports
// ============================
"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { motion } from "framer-motion";

// ============================
// Types
// ============================

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

// ============================
// Main logic
// ============================

// The Button component provides consistent button styling with variants and smooth animations.
// It supports both Link and button elements, with hover effects and focus states.

// ============================
// UI sections
// ============================

export function Button(props: ButtonProps) {
  const {
    children,
    href,
    onClick,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    disabled = false,
  } = props;

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5",
    secondary:
      "bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 hover:border-slate-600",
    outline:
      "bg-transparent text-slate-200 border-2 border-slate-600 hover:border-indigo-500 hover:text-indigo-300",
  };

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
