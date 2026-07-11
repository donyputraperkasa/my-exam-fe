"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import type { CreateTeacherQuestionPayload } from "./api";

const labels = ["A", "B", "C", "D", "E"];
type TeacherQuestionFormProps = {
  onCreate: (payload: CreateTeacherQuestionPayload) => Promise<void>;
  onSaved?: () => void;
  saving: boolean;
};

export function TeacherQuestionForm({ onCreate, onSaved, saving }: TeacherQuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [correctLabel, setCorrectLabel] = useState("A");
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const filledOptions = labels
      .map((label) => ({
        label,
        text: (options[label] ?? "").trim(),
        isCorrect: label === correctLabel,
      }))
      .filter((option) => option.text);
    if (filledOptions.length < 2) {
      setMessage("Minimal isi 2 pilihan jawaban.");
      return;
    }
    if (!filledOptions.some((option) => option.isCorrect)) {
      setMessage("Kunci jawaban harus berada di opsi yang terisi.");
      return;
    }
    await onCreate({
      question,
      explanation: explanation.trim() || undefined,
      options: filledOptions,
    });
    setMessage("");
    setQuestion("");
    setExplanation("");
    setCorrectLabel("A");
    setOptions({});
    onSaved?.();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Tambah soal</p>
      <TextArea label="Soal" value={question} onChange={setQuestion} />
      <div className="mt-4 grid gap-3">
        {labels.map((label) => (
          <OptionInput
            key={label}
            checked={correctLabel === label}
            label={label}
            onCheck={setCorrectLabel}
            onChange={(value) => setOptions({ ...options, [label]: value })}
            value={options[label] ?? ""}
          />
        ))}
      </div>
      <TextArea label="Keterangan soal" value={explanation} onChange={setExplanation} />
      {message ? <p className="mt-4 text-sm font-bold text-red-500">{message}</p> : null}
      <button
        type="submit"
        disabled={saving}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-black text-foreground shadow-lg shadow-amber-100 transition hover:brightness-105 disabled:opacity-60"
      >
        <Plus className="h-4 w-4" />
        {saving ? "Menyimpan..." : "Tambah Soal"}
      </button>
    </form>
  );
}

function TextArea({ label, onChange, value }: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-black text-foreground">
      {label}
      <textarea
        required={label === "Soal"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded-lg border border-violet-100 bg-white p-3 text-sm font-bold outline-none focus:border-violet-300"
      />
    </label>
  );
}

function OptionInput({ checked, label, onChange, onCheck, value }: {
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
  onCheck: (label: string) => void;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-foreground">
      Pilihan {label}
      <div className="flex items-center gap-3">
        <input type="radio" checked={checked} onChange={() => onCheck(label)} />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 flex-1 rounded-lg border border-violet-100 bg-white px-3 text-sm font-bold outline-none focus:border-violet-300"
        />
      </div>
    </label>
  );
}
