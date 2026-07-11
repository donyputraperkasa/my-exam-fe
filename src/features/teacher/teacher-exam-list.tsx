import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import type { TeacherExam } from "./api";

type TeacherExamListProps = {
  getDetailHref?: (id: string) => string;
  exams: TeacherExam[];
  loading: boolean;
};

export function TeacherExamList({ getDetailHref, exams, loading }: TeacherExamListProps) {
  return (
    <div className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase text-pink-400">
            Ujian terakhir
          </p>
          <h3 className="mt-2 text-2xl font-black">Ruang kerja ujian</h3>
        </div>
        <Download className="h-6 w-6 text-violet-500" />
      </div>
      <div className="mt-5 grid gap-3">
        {loading ? <EmptyState text="Memuat ujian..." /> : null}
        {!loading && !exams.length ? (
          <EmptyState text="Belum ada ujian. Buat draft pertama dulu." />
        ) : null}
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            href={getDetailHref?.(exam.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ExamCard({ exam, href }: { exam: TeacherExam; href?: string }) {
  const questions = exam._count?.questions ?? 0;
  const participants = exam._count?.participants ?? 0;
  const content = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="font-black">{exam.title}</h4>
        <p className="mt-1 text-sm font-bold text-muted">
          {questions} soal - {participants} peserta - {exam.durationMinutes} menit
        </p>
      </div>
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-slate-800">
        {exam.status}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-xl bg-background/80 p-4 transition hover:bg-violet-50">
        {content}
        <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-black text-foreground">
          Kelola soal
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    );
  }

  return (
    <article className="rounded-xl bg-background/80 p-4">
      {content}
    </article>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">
      {text}
    </div>
  );
}
