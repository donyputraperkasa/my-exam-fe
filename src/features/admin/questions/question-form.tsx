import { FormEvent } from "react";
import { Plus, X } from "lucide-react";
import type { ExamPackage, Grade, Subject } from "@/types/exam";
import { QuestionPackagePicker } from "./question-package-picker";
import type { QuestionFormState } from "./question-state";

type QuestionFormProps = {
  editingId: string;
  error: string;
  form: QuestionFormState;
  grades: Grade[];
  onCancel: () => void;
  onChange: (form: QuestionFormState) => void;
  onImageUpload: (file: File) => Promise<string>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  packages: ExamPackage[];
  subjects: Subject[];
};

export function QuestionForm({
  editingId,
  error,
  form,
  grades,
  onCancel,
  onChange,
  onImageUpload,
  onSubmit,
  packages,
  subjects,
}: QuestionFormProps) {
  const update = (patch: Partial<QuestionFormState>) => {
    onChange({ ...form, ...patch });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-secondary">
        {editingId ? "Edit Soal" : "Tambah Soal"}
      </p>
      <Select label="Jenjang" value={form.gradeId} onChange={(gradeId) => update({ gradeId })} items={grades} />
      <Select label="Mapel" value={form.subjectId} onChange={(subjectId) => update({ subjectId })} items={subjects} />
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Soal
        <textarea required value={form.question} onChange={(event) => update({ question: event.target.value })} className="min-h-24 rounded-md border border-border px-3 py-2 outline-none focus:border-primary" />
      </label>
      <QuestionOptions form={form} onChange={onChange} />
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Pembahasan teks
        <textarea value={form.explanation} onChange={(event) => update({ explanation: event.target.value })} className="min-h-20 rounded-md border border-border px-3 py-2 outline-none focus:border-primary" />
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold">
        Upload foto pembahasan
        <input
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) update({ explanationImageUrl: await onImageUpload(file) });
          }}
          className="rounded-md border border-border px-3 py-2"
        />
      </label>
      {form.explanationImageUrl ? <p className="mt-2 break-all text-xs font-bold text-muted">{form.explanationImageUrl}</p> : null}
      <Input label="URL video embed" value={form.explanationVideoUrl} onChange={(value) => update({ explanationVideoUrl: value })} />
      <QuestionPackagePicker form={form} onChange={onChange} packages={packages} />
      <div className="mt-4 grid gap-2 text-sm font-bold">
        <label><input type="checkbox" checked={form.isPublicPreview} onChange={(event) => update({ isPublicPreview: event.target.checked })} /> Soal gratis publik</label>
        <label><input type="checkbox" checked={form.isActive} onChange={(event) => update({ isActive: event.target.checked })} /> Aktif</label>
      </div>
      {error ? <p className="mt-3 text-sm font-bold text-danger">{error}</p> : null}
      <div className="mt-5 flex gap-2">
        <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-black">
          <Plus className="h-4 w-4" /> {editingId ? "Simpan" : "Tambah"}
        </button>
        {editingId ? <button type="button" onClick={onCancel} className="rounded-md border border-border px-4"><X className="h-4 w-4" /></button> : null}
      </div>
    </form>
  );
}

function Select({ items, label, onChange, value }: { items: Array<{ id: string; name: string }>; label: string; onChange: (value: string) => void; value: string }) {
  return <label className="mt-4 grid gap-2 text-sm font-bold">{label}<select required value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-border px-3 outline-none focus:border-primary">{items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>;
}

function Input({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return <label className="mt-4 grid gap-2 text-sm font-bold">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-border px-3 outline-none focus:border-primary" placeholder="https://..." /></label>;
}

function QuestionOptions({ form, onChange }: { form: QuestionFormState; onChange: (form: QuestionFormState) => void }) {
  return <div className="mt-4 grid gap-2">{form.options.map((option, index) => <label key={option.label} className="grid gap-2 text-sm font-bold">{option.label}<div className="flex gap-2"><input value={option.text} onChange={(event) => { const options = [...form.options]; options[index] = { ...option, text: event.target.value }; onChange({ ...form, options }); }} className="h-11 min-w-0 flex-1 rounded-md border border-border px-3 outline-none focus:border-primary" placeholder={index > 1 ? "Opsional" : "Wajib diisi"} /><input type="radio" name="correct" checked={option.isCorrect} onChange={() => onChange({ ...form, options: form.options.map((item, itemIndex) => ({ ...item, isCorrect: itemIndex === index })) })} /></div></label>)}</div>;
}
