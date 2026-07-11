import { FormEvent } from "react";
import { X } from "lucide-react";
import { QuestionForm } from "@/features/admin/questions/question-form";
import type { ExamPackage, Grade, Subject } from "@/types/exam";
import type { QuestionFormState } from "@/features/admin/questions/question-state";

type QuestionFormModalProps = {
  editingId: string;
  error: string;
  form: QuestionFormState;
  grades: Grade[];
  onChange: (form: QuestionFormState) => void;
  onClose: () => void;
  onImageUpload: (file: File) => Promise<string>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  packages: ExamPackage[];
  subjects: Subject[];
};

export function QuestionFormModal(props: QuestionFormModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) props.onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/40 bg-background p-4 shadow-2xl sm:p-6">
        <button
          type="button"
          onClick={props.onClose}
          aria-label="Tutup form soal"
          className="sticky top-0 z-10 ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition hover:bg-danger hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="-mt-11 pt-1">
          <QuestionForm
            editingId={props.editingId}
            error={props.error}
            form={props.form}
            grades={props.grades}
            onCancel={props.onClose}
            onChange={props.onChange}
            onImageUpload={props.onImageUpload}
            onSubmit={props.onSubmit}
            packages={props.packages}
            subjects={props.subjects.filter((item) => item.gradeId === props.form.gradeId)}
          />
        </div>
      </div>
    </div>
  );
}
