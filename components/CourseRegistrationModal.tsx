// This file defines a modal trigger and container for course registration.
// It belongs to the course details feature and wraps the registration form in a reusable modal.

// ============================
// Imports
// ============================
"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { CourseRegistrationForm } from "@/components/CourseRegistrationForm";

// ============================
// Types
// ============================

type CourseRegistrationModalProps = {
  courseId: number;
  courseTitle: string;
  courseCategory: string;
  courseDuration: string;
  courseSchedule: string;
  courseLocation: string;
  courseTrainer: string;
};

// ============================
// Main logic
// ============================

// This component keeps the registration experience focused and simple:
// - It shows a "Register now" button on the course page.
// - When clicked, it opens a modal with a short course summary and the registration form.
// - It relies on the existing CourseRegistrationForm for form submission logic.

// ============================
// UI sections and state handling
// ============================

export function CourseRegistrationModal(
  props: CourseRegistrationModalProps,
) {
  const {
    courseId,
    courseTitle,
    courseCategory,
    courseDuration,
    courseSchedule,
    courseLocation,
    courseTrainer,
  } = props;

  // ============================
  // State handling and modal toggle logic
  // ============================
  // The open/closed state is controlled here and passed to the Modal component.
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-sm shadow-indigo-800/60 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
      >
        Register now
      </button>

      <p className="text-[0.7rem] text-slate-200">
        You will be asked for your contact details in a short form.
      </p>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Register for ${courseTitle}`}
      >
        {/* ============================
            Course summary inside modal
           ============================ */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-100">
            {courseTitle}
          </p>
          <p className="text-[0.7rem] text-slate-300">
            {courseCategory} · {courseDuration} · {courseSchedule}
          </p>
          <p className="text-[0.7rem] text-slate-300">
            Location: {courseLocation}
          </p>
          <p className="text-[0.7rem] text-slate-300">
            Trainer: {courseTrainer}
          </p>
        </div>

        {/* ============================
            Form submission logic reuse
           ============================ */}
        {/* The CourseRegistrationForm already includes:
            - Form state handling
            - Submission to /api/register
            - Success and error feedback
            We simply pass the courseId so the backend can link the registration. */}
        <div className="pt-3">
          <CourseRegistrationForm courseId={courseId} />
        </div>
      </Modal>
    </div>
  );
}

