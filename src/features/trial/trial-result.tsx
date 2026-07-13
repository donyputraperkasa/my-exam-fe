"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, CheckCircle2, LockKeyhole, RotateCcw } from "lucide-react";
import { LoginModal } from "@/features/auth/components/login-modal";
import { RegisterModal } from "@/features/auth/components/register-modal";
import { appRoutes } from "@/lib/routes";
import type { TrialScore } from "./trial-types";

type TrialResultProps = {
  isAuthenticated: boolean;
  isSubscribed: boolean;
  onRetry: () => void;
  result: TrialScore;
};

export function TrialResult({
  isAuthenticated,
  isSubscribed,
  onRetry,
  result,
}: TrialResultProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[2rem] bg-white/90 p-5 text-center backdrop-blur-md">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-2xl">
          <CheckCircle2 className="mx-auto h-11 w-11 text-primary" />
          <p className="mt-4 text-sm font-black uppercase tracking-wide text-secondary">
            Hasil Tryout Gratis
          </p>
          <h2 className="mt-2 text-5xl font-black text-foreground">
            {result.score}
          </h2>
          <p className="mt-2 text-sm font-bold text-muted">
            {result.answeredCount}/{result.totalQuestions} soal dijawab.
            Pembahasan lengkap tersedia di paket premium.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-primary/10 px-4 py-3">
              <p className="text-xs font-black uppercase text-primary">Benar</p>
              <p className="mt-1 text-2xl font-black">{result.correctCount}</p>
            </div>
            <div className="rounded-xl bg-secondary/10 px-4 py-3">
              <p className="text-xs font-black uppercase text-secondary">Salah</p>
              <p className="mt-1 text-2xl font-black">
                {result.incorrectCount}
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-black"
            >
              <RotateCcw className="h-4 w-4" />
              Ulangi
            </button>
            {isSubscribed ? (
              <Link
                href={appRoutes.student.recap}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black text-foreground transition hover:bg-primary hover:text-white"
              >
                <BarChart3 className="h-4 w-4" />
                Lihat Recap Nilai
              </Link>
            ) : isAuthenticated ? (
              <Link
                href={appRoutes.student.subscription}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black text-foreground transition hover:bg-primary hover:text-white"
              >
                <LockKeyhole className="h-4 w-4" />
                Subscribe Sekarang
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black text-foreground transition hover:bg-primary hover:text-white"
              >
                <LockKeyhole className="h-4 w-4" />
                Register Sekarang
              </button>
            )}
          </div>
        </div>
      </div>
      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
    </>
  );
}
