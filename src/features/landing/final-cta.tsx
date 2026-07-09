"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { LoginModal } from "@/features/auth/components/login-modal";
import { RegisterModal } from "@/features/auth/components/register-modal";
import { MathPattern } from "./math-pattern";

export function FinalCta() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-background px-6 py-12">
        <MathPattern />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 rounded-lg border border-white/70 bg-[linear-gradient(120deg,rgba(124,58,237,0.84),rgba(255,107,107,0.72)_58%,rgba(251,191,36,0.66))] p-6 text-white shadow-sm shadow-primary/10 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Sparkles className="h-6 w-6 text-amber-100" />
              Biar latihan malam ini ada hasilnya.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Coba 10 soal gratis, lalu register untuk akses latihan lengkap.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className="rounded-md bg-white px-5 py-3 text-sm font-black text-foreground shadow-sm transition hover:bg-accent"
          >
            Daftar Sekarang
          </button>
        </div>
      </section>
      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
