// This file configures Tailwind CSS for the project, including which files to scan for class names.
// It belongs to the global styling system shared across all pages and components.

// ============================
// Imports
// ============================

/** @type {import('tailwindcss').Config} */

// ============================
// Main logic
// ============================

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#020617",
        },
      },
    },
  },
  plugins: [],
};

