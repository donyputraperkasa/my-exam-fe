import Link from "next/link";
import { Activity, Ban, CircleCheckBig, RotateCcw, UsersRound } from "lucide-react";
import type { TeacherExam, TeacherExamParticipant } from "./api";

type Props = {
  exam: TeacherExam | null;
  href?: string;
  onUnblock?: (id: string) => Promise<void>;
  participants: TeacherExamParticipant[];
  showTableWhenEmpty?: boolean;
  unblockingId?: string;
};

export function TeacherMonitorParticipants(props: Props) {
  const content = (
    <>
      <Header exam={props.exam} total={props.participants.length} />
      <ParticipantSummary participants={props.participants} />
      {!props.participants.length && !props.showTableWhenEmpty ? (
        <EmptyState />
      ) : (
        <ParticipantTable
          onUnblock={props.onUnblock}
          participants={props.participants}
          unblockingId={props.unblockingId}
        />
      )}
    </>
  );

  if (props.href) {
    return (
      <Link href={props.href} className="rounded-2xl border border-violet-100 bg-white/90 p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md sm:p-5">
        {content}
      </Link>
    );
  }

  return <section className="rounded-2xl border border-violet-100 bg-white/90 p-4 shadow-sm sm:p-5">{content}</section>;
}

function Header({ exam, total }: { exam: TeacherExam | null; total: number }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-black uppercase text-pink-400">Pantauan peserta</p>
        <h2 className="mt-1 truncate text-xl font-black sm:text-2xl">{exam?.title ?? "Pilih ujian dulu"}</h2>
      </div>
      <p className="rounded-full bg-violet-50 px-4 py-2 text-sm font-black text-violet-600">{total} siswa</p>
    </div>
  );
}

function ParticipantSummary({ participants }: { participants: TeacherExamParticipant[] }) {
  const submitted = participants.filter((item) => item.status === "SUBMITTED");
  const blocked = participants.filter((item) => item.status === "BLOCKED").length;
  const active = participants.filter((item) => item.status === "IN_PROGRESS").length;
  const average = submitted.length
    ? Math.round(submitted.reduce((sum, item) => sum + (item.score ?? 0), 0) / submitted.length)
    : 0;
  const items = [
    { icon: Activity, label: "Mengerjakan", value: active, tone: "text-blue-600 bg-blue-50" },
    { icon: CircleCheckBig, label: "Selesai", value: submitted.length, tone: "text-emerald-600 bg-emerald-50" },
    { icon: Ban, label: "Terblokir", value: blocked, tone: "text-red-500 bg-red-50" },
    { icon: UsersRound, label: "Rata-rata", value: average, tone: "text-violet-600 bg-violet-50" },
  ];

  return (
    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map(({ icon: Icon, label, tone, value }) => (
        <div key={label} className="rounded-xl border border-violet-100 bg-white p-3">
          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></span>
          <p className="mt-3 text-xl font-black">{value}</p>
          <p className="text-xs font-bold text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}

export function ParticipantTable({ onUnblock, participants, unblockingId }: {
  onUnblock?: (id: string) => Promise<void>;
  participants: TeacherExamParticipant[];
  unblockingId?: string;
}) {
  if (!participants.length) return <EmptyState />;

  return (
    <div className="mt-5">
      <div className="grid gap-3 md:hidden">
        {participants.map((item) => <ParticipantCard key={item.id} item={item} onUnblock={onUnblock} unblocking={unblockingId === item.id} />)}
      </div>
      <div className="hidden overflow-x-auto rounded-xl border border-violet-100 md:block">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-violet-50 text-xs font-black uppercase text-muted">
            <tr><th className="px-4 py-3">Nama siswa</th><th>Progres</th><th>Benar</th><th>Salah</th><th>Skor</th><th>Status</th><th className="px-4">Aksi</th></tr>
          </thead>
          <tbody>
            {participants.map((item) => (
              <tr key={item.id} className="border-t border-violet-100 bg-white font-bold">
                <td className="px-4 py-4"><p className="font-black">{item.name}</p><p className="mt-1 text-xs text-muted">Absen {item.attendanceNumber ?? "-"} · {item.className}</p></td>
                <td>{item.answeredQuestions} soal</td><td>{item.correctAnswers}</td><td>{item.wrongAnswers}</td><td className="font-black">{item.score ?? "-"}</td>
                <td><StatusBadge status={item.status} /></td>
                <td className="px-4"><UnblockButton item={item} onUnblock={onUnblock} unblocking={unblockingId === item.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ParticipantCard({ item, onUnblock, unblocking }: { item: TeacherExamParticipant; onUnblock?: (id: string) => Promise<void>; unblocking: boolean }) {
  return (
    <article className="rounded-xl border border-violet-100 bg-white p-4">
      <div className="flex items-start justify-between gap-3"><div><p className="font-black">{item.name}</p><p className="mt-1 text-xs font-bold text-muted">Absen {item.attendanceNumber ?? "-"} · {item.className}</p></div><StatusBadge status={item.status} /></div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center"><Metric label="Progres" value={item.answeredQuestions} /><Metric label="Benar" value={item.correctAnswers} /><Metric label="Salah" value={item.wrongAnswers} /><Metric label="Skor" value={item.score ?? "-"} /></div>
      <UnblockButton item={item} onUnblock={onUnblock} unblocking={unblocking} />
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return <div className="rounded-lg bg-background p-2"><p className="font-black">{value}</p><p className="text-[11px] font-bold text-muted">{label}</p></div>;
}

function StatusBadge({ status }: { status: TeacherExamParticipant["status"] }) {
  const labels = { IN_PROGRESS: "Mengerjakan", SUBMITTED: "Selesai", BLOCKED: "Terblokir" };
  const tones = { IN_PROGRESS: "bg-blue-50 text-blue-600", SUBMITTED: "bg-emerald-50 text-emerald-600", BLOCKED: "bg-red-50 text-red-500" };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${tones[status]}`}>{labels[status]}</span>;
}

function UnblockButton({ item, onUnblock, unblocking }: { item: TeacherExamParticipant; onUnblock?: (id: string) => Promise<void>; unblocking: boolean }) {
  if (!onUnblock || item.status !== "BLOCKED") return <span className="text-xs font-bold text-muted">-</span>;
  return <button type="button" disabled={unblocking} onClick={() => void onUnblock(item.id)} className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-accent px-3 text-xs font-black disabled:opacity-60 md:mt-0"><RotateCcw className="h-3.5 w-3.5" />{unblocking ? "Memproses..." : "Izinkan lanjut"}</button>;
}

function EmptyState() {
  return <p className="mt-5 rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">Belum ada siswa yang masuk ke ujian ini.</p>;
}
