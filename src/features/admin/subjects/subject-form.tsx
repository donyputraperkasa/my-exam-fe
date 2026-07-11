import { FormEvent } from "react";
import { Plus, X } from "lucide-react";
import type { Grade } from "@/types/exam";

type SubjectFormProps = {
  editingId: string;
  error: string;
  gradeId: string;
  grades: Grade[];
  name: string;
  onCancel: () => void;
  onGradeChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function SubjectForm({
  editingId,
  error,
  gradeId,
  grades,
  name,
  onCancel,
  onGradeChange,
  onNameChange,
  onSubmit,
}: SubjectFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-border bg-white/88 p-5 shadow-sm"
    >
      <p className="text-sm font-black uppercase text-secondary">
        {editingId ? "Edit Mapel" : "Tambah Mapel"}
      </p>
      <Field label="Nama mapel" value={name} onChange={onNameChange} />
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Jenjang
        <select
          value={gradeId}
          onChange={(event) => onGradeChange(event.target.value)}
          className="h-11 rounded-md border border-border px-3 outline-none focus:border-primary"
          required
        >
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
      </label>
      {error ? <p className="mt-3 text-sm font-bold text-danger">{error}</p> : null}
      <div className="mt-5 flex gap-2">
        <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-black">
          <Plus className="h-4 w-4" /> {editingId ? "Simpan" : "Tambah"}
        </button>
        {editingId ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border px-4"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-border px-3 outline-none focus:border-primary"
        required
      />
    </label>
  );
}
