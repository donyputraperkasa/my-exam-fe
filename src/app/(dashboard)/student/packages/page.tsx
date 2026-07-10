import Link from "next/link";
import { LockKeyhole, PackageCheck, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { appRoutes } from "@/lib/routes";

const packages = [
  {
    title: "Paket Gratis",
    description: "10 soal pemanasan yang bisa dicoba tanpa register.",
    meta: "10 soal",
    href: appRoutes.student.trial,
    locked: false,
  },
  {
    title: "Paket Premium 1",
    description: "Paket latihan penuh dengan recap dan pembahasan lengkap.",
    meta: "Premium",
    href: appRoutes.student.subscription,
    locked: true,
  },
  {
    title: "Paket Premium 2",
    description: "Latihan bertahap untuk siswa yang ingin target skor tinggi.",
    meta: "Premium",
    href: appRoutes.student.subscription,
    locked: true,
  },
  {
    title: "Paket Premium 3",
    description: "Paket lanjutan untuk pembahasan dan drilling per materi.",
    meta: "Premium",
    href: appRoutes.student.subscription,
    locked: true,
  },
];

export default function StudentPackagesPage() {
  return (
    <DashboardShell eyebrow="Ruang Belajar" role="STUDENT" title="Paket Latihan">
      <section className="grid gap-4 lg:grid-cols-4">
        {packages.map((item) => (
          <article
            key={item.title}
            className={`relative overflow-hidden rounded-lg border p-5 shadow-sm ${
              item.locked
                ? "border-purple-200 bg-gradient-to-br from-purple-50 via-white to-rose-50"
                : "border-border bg-surface"
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {item.locked ? (
                <LockKeyhole className="h-5 w-5" />
              ) : (
                <PackageCheck className="h-5 w-5" />
              )}
            </span>
            <p className="mt-5 text-sm font-bold uppercase tracking-wide text-secondary">
              {item.meta}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {item.description}
            </p>
            <Link
              href={item.href}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-black text-foreground"
            >
              <Sparkles className="h-4 w-4" />
              {item.locked ? "Lihat Akses" : "Coba Sekarang"}
            </Link>
            {item.locked ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/72 p-5 text-center backdrop-blur-sm">
                <LockKeyhole className="h-10 w-10 text-primary" />
                <p className="mt-3 text-sm font-black uppercase text-secondary">
                  Terkunci
                </p>
                <p className="mt-1 text-xs font-bold leading-5 text-muted">
                  Aktifkan subscription untuk membuka paket ini.
                </p>
              </div>
            ) : null}
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
