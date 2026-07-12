"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import type { CreateTeacherQuestionPayload, TeacherQuestion } from "./api";
import { QuestionOptionInput, QuestionTextArea } from "./teacher-question-fields";

const labels = ["A", "B", "C", "D", "E"];
type TeacherQuestionFormProps = {
  onCreate: (payload: CreateTeacherQuestionPayload) => Promise<void>;
  onSaved?: () => void;
  initialQuestion?: TeacherQuestion;
  saving: boolean;
};

export function TeacherQuestionForm({ initialQuestion, onCreate, onSaved, saving }: TeacherQuestionFormProps) {
  const [question, setQuestion] = useState(initialQuestion?.question ?? "");
  const [explanation, setExplanation] = useState(initialQuestion?.explanation ?? "");
  const [correctLabel, setCorrectLabel] = useState(
    initialQuestion?.options.find((option) => option.isCorrect)?.label ?? "A",
  );
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState<Record<string, string>>(
    Object.fromEntries(initialQuestion?.options.map((option) => [option.label, option.text]) ?? []),
  );

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
      <p className="text-sm font-black uppercase text-pink-400">
        {initialQuestion ? "Edit soal" : "Tambah soal"}
      </p>
      <QuestionTextArea label="Soal" value={question} onChange={setQuestion} />
      <div className="mt-4 grid gap-3">
        {labels.map((label) => (
          <QuestionOptionInput
            key={label}
            checked={correctLabel === label}
            label={label}
            onCheck={setCorrectLabel}
            onChange={(value) => setOptions({ ...options, [label]: value })}
            value={options[label] ?? ""}
          />
        ))}
      </div>
      <QuestionTextArea label="Keterangan soal" value={explanation} onChange={setExplanation} />
      {message ? <p className="mt-4 text-sm font-bold text-red-500">{message}</p> : null}
      <button
        type="submit"
        disabled={saving}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-black text-foreground shadow-lg shadow-amber-100 transition hover:brightness-105 disabled:opacity-60"
      >
        <Plus className="h-4 w-4" />
        {saving ? "Menyimpan..." : initialQuestion ? "Simpan Perubahan" : "Tambah Soal"}
      </button>
    </form>
  );
}
