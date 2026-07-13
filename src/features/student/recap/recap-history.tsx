import type { RecapAttempt, TrialResult } from "./recap-api";

type HistoryItem = {
  id: string;
  title: string;
  subject: string;
  correct: number;
  incorrect: number;
  score: number;
  createdAt: string;
};

export function RecapHistory({ attempts, trials }: { attempts: RecapAttempt[]; trials: TrialResult[] }) {
  const items = buildHistory(attempts, trials);
  if (!items.length) {
    return <p className="rounded-lg border border-dashed border-border bg-white/70 p-6 text-sm font-bold text-muted">Belum ada hasil latihan. Selesaikan coba gratis atau paket soal pertamamu.</p>;
  }
  return (
    <section className="grid gap-3">
      <h2 className="text-xl font-black">Riwayat latihan</h2>
      <div className="overflow-x-auto rounded-lg border border-border bg-white/88 shadow-sm">
        <table className="min-w-[850px] w-full border-separate border-spacing-0 text-left text-sm">
          <thead><tr className="text-xs font-black uppercase text-muted"><Header>Latihan / Paket</Header><Header>Mapel</Header><Header>Benar</Header><Header>Salah</Header><Header>Skor</Header><Header>Tanggal</Header></tr></thead>
          <tbody>{items.map((item) => <HistoryRow key={item.id} item={item} />)}</tbody>
        </table>
      </div>
    </section>
  );
}

function HistoryRow({ item }: { item: HistoryItem }) {
  return (
    <tr className="font-bold">
      <Cell><span className="font-black">{item.title}</span></Cell>
      <Cell>{item.subject}</Cell>
      <Cell><span className="text-emerald-600">{item.correct}</span></Cell>
      <Cell><span className="text-secondary">{item.incorrect}</span></Cell>
      <Cell><span className={`inline-flex min-w-12 justify-center rounded-full px-3 py-1 font-black ${item.score >= 70 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-secondary"}`}>{item.score}</span></Cell>
      <Cell>{formatDate(item.createdAt)}</Cell>
    </tr>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-border bg-background/60 px-4 py-3">{children}</th>;
}

function Cell({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-border/70 px-4 py-4">{children}</td>;
}

function buildHistory(attempts: RecapAttempt[], trials: TrialResult[]): HistoryItem[] {
  const packageItems = attempts.filter((item) => item.submittedAt).map((item) => {
    const correct = item.answers.filter((answer) => answer.isCorrect).length;
    return { id: item.id, title: item.package.title, subject: item.package.subject.name, correct, incorrect: item.answers.length - correct, score: item.score ?? 0, createdAt: item.submittedAt ?? item.createdAt };
  });
  const trialItems = trials.map((item) => ({ id: item.id, title: "Coba Gratis", subject: "Matematika", correct: item.correctCount, incorrect: item.incorrectCount, score: item.score, createdAt: item.createdAt }));
  return [...packageItems, ...trialItems].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
