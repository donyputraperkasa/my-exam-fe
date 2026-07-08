import Link from "next/link";
import { Sparkles } from "lucide-react";
import { MathPattern } from "./math-pattern";
import { appRoutes } from "@/lib/routes";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] px-6 py-12">
      <MathPattern />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 rounded-lg bg-[#142033] p-6 text-white shadow-sm shadow-primary/10 md:flex-row md:items-center">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Sparkles className="h-6 w-6 text-accent" />
            Biar latihan malam ini ada hasilnya.
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Mulai dari paket gratis, lalu lanjut ke akses penuh saat sudah cocok.
          </p>
        </div>
        <Link
          href={appRoutes.auth.register}
          className="rounded-md bg-accent px-5 py-3 text-sm font-bold text-foreground transition hover:bg-amber-400"
        >
          Daftar Sekarang
        </Link>
      </div>
    </section>
  );
}
