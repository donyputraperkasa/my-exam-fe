import Link from "next/link";
import { BarChart3, CheckCircle2, RotateCcw } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import type { TrialScore } from "@/features/trial/trial-types";

export function PackageExamResult({ onRetry, result }: { onRetry: () => void; result: TrialScore }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[2rem] bg-white/90 p-5 text-center backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <CheckCircle2 className="mx-auto h-11 w-11 text-primary" />
        <p className="mt-4 text-sm font-black uppercase text-secondary">Hasil Paket Soal</p>
        <p className="mt-2 text-5xl font-black">{result.score}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ResultCount label="Benar" value={result.correctCount} className="bg-primary/10 text-primary" />
          <ResultCount label="Salah" value={result.incorrectCount} className="bg-secondary/10 text-secondary" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={onRetry} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-black"><RotateCcw className="h-4 w-4" />Kerjakan Lagi</button>
          <Link href={appRoutes.student.recap} className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black"><BarChart3 className="h-4 w-4" />Lihat Recap Nilai</Link>
        </div>
      </div>
    </div>
  );
}

function ResultCount({ className, label, value }: { className: string; label: string; value: number }) {
  return <div className={`rounded-xl px-4 py-3 ${className}`}><p className="text-xs font-black uppercase">{label}</p><p className="mt-1 text-2xl font-black">{value}</p></div>;
}
