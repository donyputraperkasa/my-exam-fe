import Link from "next/link";
import type { TeacherExam, TeacherExamParticipant } from "./api";

type TeacherMonitorParticipantsProps = {
  exam: TeacherExam | null;
  href?: string;
  participants: TeacherExamParticipant[];
  showTableWhenEmpty?: boolean;
};

export function TeacherMonitorParticipants({
  exam,
  href,
  participants,
  showTableWhenEmpty = false,
}: TeacherMonitorParticipantsProps) {
  const content = (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase text-pink-400">Peserta</p>
          <h2 className="mt-1 text-2xl font-black">{exam?.title ?? "Pilih ujian dulu"}</h2>
        </div>
        <p className="rounded-full bg-violet-50 px-4 py-2 text-sm font-black text-violet-500">
          {participants.length} siswa
        </p>
      </div>
      {!participants.length && !showTableWhenEmpty ? (
        <p className="mt-5 rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">
          Belum ada siswa yang masuk ke ujian ini.
        </p>
      ) : (
        <ParticipantTable participants={participants} />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
      >
        {content}
      </Link>
    );
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-5 shadow-sm">
      {content}
    </section>
  );
}

export function ParticipantTable({ participants }: { participants: TeacherExamParticipant[] }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-violet-100">
      <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] bg-violet-50 px-4 py-3 text-xs font-black uppercase text-muted">
        <p>Nama siswa</p>
        <p>Menjawab benar</p>
        <p>Menjawab salah</p>
        <p>Skor</p>
      </div>
      {!participants.length ? (
        <p className="border-t border-violet-100 bg-white px-4 py-5 text-sm font-bold text-muted">
          Belum ada siswa yang masuk ke ujian ini.
        </p>
      ) : null}
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] border-t border-violet-100 bg-white px-4 py-4 text-sm font-bold"
        >
          <div>
            <p className="font-black">{participant.name}</p>
            <p className="mt-1 text-xs text-muted">
              Absen {participant.attendanceNumber ?? "-"} - {participant.className}
            </p>
          </div>
          <p>{participant.correctAnswers ?? 0}</p>
          <p>{participant.wrongAnswers ?? 0}</p>
          <p>{participant.score ?? "-"}</p>
        </div>
      ))}
    </div>
  );
}
