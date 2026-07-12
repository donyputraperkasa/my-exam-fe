import type { TeacherExam } from "./api";

type TeacherMonitorExamListProps = {
  exams: TeacherExam[];
  loading: boolean;
  onSelect: (id: string) => void;
  selectedExamId: string;
};

export function TeacherMonitorExamList({
  exams,
  loading,
  onSelect,
  selectedExamId,
}: TeacherMonitorExamListProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-pink-400">Pilih ujian</p>
      <div className="mt-4 grid gap-3">
        {loading ? <p className="text-sm font-bold text-muted">Memuat ujian...</p> : null}
        {!loading && !exams.length ? (
          <p className="text-sm font-bold text-muted">Belum ada ujian untuk dipantau.</p>
        ) : null}
        {exams.map((exam) => (
          <button
            key={exam.id}
            type="button"
            onClick={() => onSelect(exam.id)}
            className={`rounded-xl border p-4 text-left transition ${selectedExamId === exam.id ? "border-amber-200 bg-amber-50" : "border-violet-100 bg-white hover:border-violet-200"}`}
          >
            <p className="text-base font-black">{exam.title}</p>
            <p className="mt-2 text-xs font-bold uppercase text-muted">
              {exam.status} - {exam._count?.participants ?? 0} peserta
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
