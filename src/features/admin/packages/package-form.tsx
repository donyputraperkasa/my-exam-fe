import { FormEvent } from "react";
import type { Grade, Subject } from "@/types/exam";
import type { PackagePayload } from "./packages-api";

type PackageFormProps = {
  editingId: string;
  error: string;
  form: PackagePayload;
  grades: Grade[];
  onChange: (form: PackagePayload) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  subjects: Subject[];
};

export function PackageForm(props: PackageFormProps) {
  const { editingId, error, form, grades, onChange, onSubmit, subjects } = props;
  const update = (patch: Partial<PackagePayload>) => onChange({ ...form, ...patch });

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-secondary">{editingId ? "Edit Paket" : "Tambah Paket"}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Input label="Nama paket" value={form.title} onChange={(title) => update({ title })} />
        <Select label="Jenjang" value={form.gradeId} onChange={(gradeId) => update({ gradeId })} items={grades} />
        <Select label="Mapel" value={form.subjectId} onChange={(subjectId) => update({ subjectId })} items={subjects} />
        <Input label="Durasi menit" required={false} value={String(form.durationMinutes ?? "")} onChange={(value) => update({ durationMinutes: value ? Number(value) : undefined })} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="grid gap-2 text-sm font-bold">Akses<select value={form.accessType} onChange={(event) => update({ accessType: event.target.value as PackagePayload["accessType"] })} className="h-11 rounded-md border border-border px-3"><option value="FREE">Free</option><option value="PREMIUM">Premium</option></select></label>
        <label className="mt-6 text-sm font-bold"><input type="checkbox" checked={form.isActive} onChange={(event) => update({ isActive: event.target.checked })} /> Paket aktif</label>
      </div>
      <p className="mt-3 text-xs font-bold text-muted">Setelah paket dibuat, masukkan soal dari menu Soal dan Pembahasan.</p>
      {error ? <p className="mt-3 text-sm font-bold text-danger">{error}</p> : null}
      <button className="mt-5 rounded-md bg-accent px-6 py-3 text-sm font-black">
        {editingId ? "Simpan Paket" : "Tambah Paket"}
      </button>
    </form>
  );
}

function Input({ label, onChange, required = true, value }: { label: string; onChange: (value: string) => void; required?: boolean; value: string }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-border px-3 outline-none focus:border-primary" required={required} /></label>;
}

function Select({ items, label, onChange, value }: { items: Array<{ id: string; name: string }>; label: string; onChange: (value: string) => void; value: string }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<select required value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-md border border-border px-3 outline-none focus:border-primary">{items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>;
}
