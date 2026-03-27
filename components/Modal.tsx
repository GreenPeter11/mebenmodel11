// This file defines a reusable modal component used to show content in an overlay.
// It belongs to the shared UI components and is used by pages such as course details for registration.

// ============================
// Imports
// ============================
"use client";

import type { ReactNode } from "react";

// ============================
// Types
// ============================

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

// ============================
// Main logic
// ============================

// The Modal component:
// - Uses a controlled `isOpen` prop so the parent decides when it is visible.
// - Renders a semi-transparent overlay behind the modal content.
// - Includes a close button and basic ARIA attributes for accessibility.

// ============================
// UI sections
// ============================

export function Modal(props: ModalProps) {
  const { isOpen, title, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Dialog"}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/95 p-5 text-slate-50 shadow-xl shadow-slate-950/70">
        <div className="flex items-start justify-between gap-3">
          {title ? (
            <h2 className="text-sm font-semibold text-slate-50">{title}</h2>
          ) : (
            <span className="text-sm font-semibold text-slate-50">
              Details
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-2 py-1 text-[0.7rem] text-slate-200 shadow-sm shadow-slate-900/40 transition hover:border-slate-400 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs text-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
}

