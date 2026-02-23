// This file defines a small example helper function for formatting labels.
// It belongs to the shared library utilities that can be reused across pages and components.

// ============================
// Imports
// ============================

// There are no imports for this helper yet. Add them here if needed later.

// ============================
// Main logic
// ============================

/**
 * Creates a simple label that can be displayed in the UI.
 * The function keeps behavior explicit and easy to adjust later.
 */
export function createSimpleLabel(value: string): string {
  if (!value) {
    return "Not specified";
  }

  return `Label: ${value}`;
}

