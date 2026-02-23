// This file defines a simple reusable card component with a title and description.
// It belongs to the shared components library used by the home page and future features.

// ============================
// Imports
// ============================
import type { ReactNode } from "react";

// ============================
// Types
// ============================
type PrimaryCardProps = {
  title: string;
  description: string;
  actionSlot?: ReactNode;
};

// ============================
// Main logic
// ============================

// The PrimaryCard component is intentionally minimal.
// It can be extended later with buttons, links, or icons if needed.

// ============================
// UI sections
// ============================

export function PrimaryCard(props: PrimaryCardProps) {
  const { title, description, actionSlot } = props;

  return (
    <article className="flex flex-col justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-900/40">
      <div className="space-y-1.5">
        <h2 className="text-sm font-semibold text-slate-50">{title}</h2>
        <p className="text-xs text-slate-300">{description}</p>
      </div>

      {actionSlot ? (
        <div className="pt-2 text-xs text-slate-400">{actionSlot}</div>
      ) : null}
    </article>
  );
}

