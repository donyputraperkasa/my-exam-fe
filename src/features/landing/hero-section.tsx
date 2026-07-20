"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/features/auth/components/login-modal";
import { RegisterModal } from "@/features/auth/components/register-modal";
import { getDashboardPath } from "@/features/auth/redirect";
import { getToken, getUser } from "@/features/auth/session";
import { appRoutes } from "@/lib/routes";
import { HeroActions } from "./hero-actions";
import { HeroPracticeCard } from "./hero-practice-card";
import { PackagePreviewModal } from "./package-preview-modal";
import { StatsRow } from "./stats-row";

type LandingAuthMode = "login" | "register" | null;

export function HeroSection({
  initialAuthMode = null,
}: {
  initialAuthMode?: LandingAuthMode;
}) {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(initialAuthMode === "login");
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(
    initialAuthMode === "register",
  );

  useEffect(() => {
    if (!initialAuthMode) return;

    const url = new URL(window.location.href);
    const user = getUser();
    if (getToken() && user) {
      router.replace(getDashboardPath(user.role));
      return;
    }

    url.searchParams.delete("auth");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [initialAuthMode, router]);

  return (
    <>
      <section
        className="relative min-h-[92vh] overflow-hidden bg-cover bg-center px-6 py-6 text-white"
        style={{ backgroundImage: "url('/images/landing-math-hero.png')" }}
      >
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(124,58,237,0.54),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(255,107,107,0.42),transparent_28%),radial-gradient(circle_at_50%_95%,rgba(251,191,36,0.28),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,38,75,0.78),rgba(45,38,75,0.46),rgba(255,248,242,0.28))]" />
        <div className="relative mx-auto flex min-h-[84vh] w-full max-w-6xl flex-col justify-between">
          <nav className="flex items-center justify-between gap-4">
            <Link href={appRoutes.home} className="text-lg font-bold">
              My Exam
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="rounded-md border border-white/70 bg-white/16 px-4 py-2 text-sm font-bold text-white shadow-sm backdrop-blur-md transition hover:bg-white hover:text-foreground"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="rounded-md bg-white px-4 py-2 text-sm font-black text-foreground shadow-sm transition hover:bg-pink-500 hover:text-white"
              >
                Register
              </button>
            </div>
          </nav>
          <div className="grid items-center gap-8 py-10 md:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-pink-400">
                Belajar serius, rasanya tetap ringan
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Naikkan skor matematika tanpa belajar asal-asalan.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/90">
                My Exam bantu siswa latihan TKA dan ASPD dengan paket soal,
                pembahasan, dan recap nilai yang gampang dibaca.
              </p>
              <HeroChips />
              <HeroActions
                onOpenPackages={() => setIsPackageOpen(true)}
                onStartTrial={() => router.push(appRoutes.trial)}
              />
            </div>
            <HeroPracticeCard />
          </div>
          <StatsRow />
        </div>
      </section>
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
      <PackagePreviewModal
        open={isPackageOpen}
        onClose={() => setIsPackageOpen(false)}
        onRegister={() => {
          setIsPackageOpen(false);
          setIsRegisterOpen(true);
        }}
        onStartFree={() => {
          setIsPackageOpen(false);
          router.push(appRoutes.trial);
        }}
      />
    </>
  );
}

function HeroChips() {
  return (
    <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
      <span className="rounded-full bg-white/12 px-3 py-2">10 soal gratis</span>
      <span className="rounded-full bg-white/12 px-3 py-2">Pembahasan</span>
      <span className="rounded-full bg-white/12 px-3 py-2">Recap skor</span>
    </div>
  );
}
