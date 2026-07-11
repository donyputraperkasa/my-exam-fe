"use client";

import { FormEvent, useState } from "react";
import { ClipboardList } from "lucide-react";
import type { CreateTeacherExamPayload } from "./api";

type TeacherExamFormProps = {
  creating: boolean;
  onCreate: (payload: CreateTeacherExamPayload) => Promise<void>;
};

export function TeacherExamForm({ creating, onCreate }: TeacherExamFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [pin, setPin] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onCreate({
      title,
      description: description.trim() || undefined,
      durationMinutes,
      pin,
    });
    setTitle("");
    setDescription("");
    setDurationMinutes(60);
    setPin("");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <ClipboardList className="h-8 w-8 text-violet-500" />
      <h3 className="mt-3 text-2xl font-black">Buat ujian baru</h3>
      <div className="mt-5 grid gap-3">
        <Input label="Judul ujian" value={title} onChange={setTitle} />
        <Input label="Deskripsi" value={description} onChange={setDescription} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            label="Durasi menit"
            type="number"
            value={String(durationMinutes)}
            onChange={(value) => setDurationMinutes(Number(value))}
          />
          <Input label="PIN ujian" value={pin} onChange={setPin} />
        </div>
      </div>
      <button
        type="submit"
        disabled={creating}
        className="mt-5 h-12 w-full rounded-xl bg-accent text-sm font-black text-foreground shadow-lg shadow-amber-100 transition hover:brightness-105 disabled:opacity-60"
      >
        {creating ? "Menyimpan..." : "Simpan Draft Ujian"}
      </button>
    </form>
  );
}

function Input({
  label,
  onChange,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-foreground">
      {label}
      <input
        required={label !== "Deskripsi"}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-lg border border-violet-100 bg-white px-3 text-sm font-bold outline-none transition focus:border-violet-300"
      />
    </label>
  );
}
