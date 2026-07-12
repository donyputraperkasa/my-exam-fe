"use client";

import { X } from "lucide-react";
import type { CreateTeacherQuestionPayload, TeacherQuestion } from "./api";
import { TeacherQuestionForm } from "./teacher-question-form";

type TeacherQuestionModalProps = {
  onClose: () => void;
  onCreate: (payload: CreateTeacherQuestionPayload) => Promise<void>;
  open: boolean;
  question?: TeacherQuestion;
  saving: boolean;
};

export function TeacherQuestionModal({
  onClose,
  onCreate,
  open,
  question,
  saving,
}: TeacherQuestionModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="mx-auto w-full max-w-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-violet-100 bg-white text-violet-500 shadow-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <TeacherQuestionForm
          initialQuestion={question}
          onCreate={onCreate}
          onSaved={onClose}
          saving={saving}
        />
      </div>
    </div>
  );
}
