import { Download } from "lucide-react";
import type { TeacherExam } from "./api";

type TeacherExamListProps = {
  exams: TeacherExam[];
  loading: boolean;
};

export function TeacherExamList({ exams, loading }: TeacherExamListProps) {
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
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
}

function ExamCard({ exam }: { exam: TeacherExam }) {
  const questions = exam._count?.questions ?? 0;
  const participants = exam._count?.participants ?? 0;
  return (
    <article className="rounded-xl bg-background/80 p-4">
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
