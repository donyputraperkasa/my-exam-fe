"use client";

import { FormEvent, useEffect, useState } from "react";
import { Clock3, LockKeyhole } from "lucide-react";
import {
  getPublicTeacherExam,
  joinTeacherExam,
  type PublicTeacherExam,
} from "./public-api";
import { PublicTeacherExamRunner } from "./public-teacher-exam-runner";

type PublicTeacherExamEntryProps = {
  shareToken: string;
};

export function PublicTeacherExamEntry({ shareToken }: PublicTeacherExamEntryProps) {
  const [exam, setExam] = useState<PublicTeacherExam | null>(null);
  const [name, setName] = useState("");
  const [attendanceNumber, setAttendanceNumber] = useState("");
  const [className, setClassName] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [participantToken, setParticipantToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicTeacherExam(shareToken)
      .then(setExam)
      .catch((error) => setMessage(getError(error, "Ujian tidak tersedia")))
      .finally(() => setLoading(false));
  }, [shareToken]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    try {
      const participant = await joinTeacherExam(
        { attendanceNumber, className, name, pin },
        shareToken,
      );
      setParticipantToken(participant.participantToken);
    } catch (error) {
      setMessage(getError(error, "Gagal masuk ujian"));
    }
  }

  if (exam && participantToken) {
    return (
      <PublicTeacherExamRunner
        exam={exam}
        participantToken={participantToken}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-5 sm:py-8">
      <section className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm sm:p-6">
          <p className="text-sm font-black uppercase text-pink-400">Mode ujian</p>
          <h1 className="mt-3 break-words text-3xl font-black sm:text-4xl">{exam?.title ?? "Memuat ujian..."}</h1>
          <p className="mt-3 text-sm font-bold leading-6 text-muted">
            {loading ? "Menyiapkan halaman ujian." : exam?.description ?? "Isi data peserta untuk mulai mengerjakan."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-black text-muted">
            <span className="inline-flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2">
              <Clock3 className="h-4 w-4" />
              {exam?.durationMinutes ?? "-"} menit
            </span>
            <span className="rounded-xl bg-violet-50 px-3 py-2">
              {exam?.questions.length ?? 0} soal
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm sm:p-6">
          <LockKeyhole className="h-8 w-8 text-violet-500" />
          <h2 className="mt-3 text-2xl font-black">Masuk ujian</h2>
          <Input label="Nama siswa" value={name} onChange={setName} />
          <Input label="Nomor absen" value={attendanceNumber} onChange={setAttendanceNumber} />
          <Input label="Kelas" value={className} onChange={setClassName} />
          <Input label="PIN dari guru" value={pin} onChange={setPin} />
          {message ? <p className="mt-4 text-sm font-bold text-violet-500">{message}</p> : null}
          <button className="mt-5 h-12 w-full rounded-xl bg-accent text-sm font-black text-foreground" type="submit">
            Mulai Ujian
          </button>
        </form>
      </section>
    </main>
  );
}

function Input({ label, onChange, value }: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-black">
      {label}
      <input
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-lg border border-violet-100 bg-white px-3 text-sm font-bold outline-none focus:border-violet-300"
      />
    </label>
  );
}

function getError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
