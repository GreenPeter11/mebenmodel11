// This file configures PostCSS for the project, enabling Tailwind CSS and autoprefixer.
// It belongs to the global build tooling that processes CSS for all pages and components.

// ============================
// Imports
// ============================

// PostCSS loads the plugins defined below; no explicit imports are required here.

// ============================
// Main logic
// ============================

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

