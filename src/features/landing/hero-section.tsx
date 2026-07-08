import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { HeroPracticeCard } from "./hero-practice-card";
import { StatsRow } from "./stats-row";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] overflow-hidden bg-cover bg-center px-6 py-6 text-white"
      style={{ backgroundImage: "url('/images/landing-math-hero.png')" }}
    >
      <div className="absolute inset-0 bg-[#172033]/70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,32,51,0.98)_0%,rgba(23,32,51,0.78)_42%,rgba(15,118,110,0.22)_100%)]" />
      <div className="relative mx-auto flex min-h-[84vh] w-full max-w-6xl flex-col justify-between">
        <nav className="flex items-center justify-between gap-4">
          <Link href={appRoutes.home} className="text-lg font-bold">
            My Exam
          </Link>
          <Link
            href={appRoutes.auth.login}
            className="rounded-md border border-white/50 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-foreground"
          >
            Masuk
          </Link>
        </nav>
        <div className="grid items-center gap-8 py-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Belajar serius, rasanya tetap ringan
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Naikkan skor matematika tanpa belajar asal-asalan.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/90">
              My Exam bantu siswa latihan TKA dan ASPD dengan paket soal,
              pembahasan, dan recap nilai yang gampang dibaca.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-white/12 px-3 py-2">Free trial</span>
              <span className="rounded-full bg-white/12 px-3 py-2">Pembahasan</span>
              <span className="rounded-full bg-white/12 px-3 py-2">Recap skor</span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={appRoutes.auth.register}
                className="rounded-md bg-accent px-5 py-3 text-center text-sm font-bold text-foreground transition hover:bg-amber-400"
              >
                Mulai Gratis
              </Link>
              <Link
                href={appRoutes.student.packages}
                className="rounded-md border border-white/60 px-5 py-3 text-center text-sm font-bold transition hover:bg-white/10"
              >
                Lihat Paket
              </Link>
            </div>
          </div>
          <HeroPracticeCard />
        </div>
        <StatsRow />
      </div>
    </section>
  );
}
