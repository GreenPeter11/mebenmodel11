// This file configures Next.js for the project, including experimental and build options.
// It belongs to the global application configuration that affects all routes and pages.

// ============================
// Main logic
// ============================

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ESLint warnings/errors won't fail the production build on Render
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

