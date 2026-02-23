// This file defines the root layout for the Next.js application and sets up global HTML structure.
// It belongs to the main application shell for all pages in the project.

// ============================
// Imports
// ============================
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ============================
// Main logic
// ============================

export const metadata = {
  title: "Mebenmodel - Transform Your Skills, Transform Your Future",
  description:
    "Join thousands of learners mastering practical skills in Business, IT, and Agriculture. Expert-led courses designed for real-world impact.",
};

type RootLayoutProps = {
  children: ReactNode;
};

// ============================
// UI sections
// ============================

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          {/* Global header with navigation, shared across all pages */}
          <Navbar />

          {/* Main content area */}
          <main className="flex-1">{children}</main>

          {/* Global footer, shared across all pages */}
          <Footer />
        </div>
      </body>
    </html>
  );
}

