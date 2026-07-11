"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LockKeyhole, PackageCheck, Sparkles } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import type { ExamPackage } from "@/types/exam";
import { fetchStudentPackages } from "./student-packages-api";

export function StudentPackageList() {
  const [packages, setPackages] = useState<ExamPackage[]>([]);

  useEffect(() => {
    void fetchStudentPackages()
      .then((response) => setPackages(response.data))
      .catch(() => setPackages([]));
  }, []);

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <TrialCard />
      {packages.map((item) => <PackageCard key={item.id} item={item} />)}
      {!packages.length ? <EmptyPackageHint /> : null}
    </section>
  );
}

function TrialCard() {
  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <IconBox locked={false} />
      <p className="mt-5 text-sm font-bold uppercase text-secondary">10 soal</p>
      <h2 className="mt-2 text-2xl font-extrabold">Paket Gratis</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        10 soal pemanasan untuk mencoba alur latihan.
      </p>
      <Action href={appRoutes.student.trial} label="Coba Sekarang" />
    </article>
  );
}

function PackageCard({ item }: { item: ExamPackage }) {
  const locked = item.accessType === "PREMIUM";

  return (
    <article className={`relative overflow-hidden rounded-lg border p-5 shadow-sm ${locked ? "border-purple-200 bg-gradient-to-br from-purple-50 via-white to-rose-50" : "border-border bg-surface"}`}>
      <IconBox locked={locked} />
      <p className="mt-5 text-sm font-bold uppercase text-secondary">
        {item.accessType} · {item._count?.questions ?? 0} soal
      </p>
      <h2 className="mt-2 text-2xl font-extrabold">{item.title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        {item.grade?.name} - {item.subject?.name}
      </p>
      <Action href={locked ? appRoutes.student.subscription : appRoutes.student.packageDetail(item.id)} label={locked ? "Lihat Akses" : "Mulai Paket"} />
      {locked ? <LockedOverlay /> : null}
    </article>
  );
}

function Action({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-black text-foreground"><Sparkles className="h-4 w-4" />{label}</Link>;
}

function IconBox({ locked }: { locked: boolean }) {
  return <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">{locked ? <LockKeyhole className="h-5 w-5" /> : <PackageCheck className="h-5 w-5" />}</span>;
}

function LockedOverlay() {
  return <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/72 p-5 text-center backdrop-blur-sm"><LockKeyhole className="h-10 w-10 text-primary" /><p className="mt-3 text-sm font-black uppercase text-secondary">Terkunci</p><p className="mt-1 text-xs font-bold leading-5 text-muted">Aktifkan subscription untuk membuka paket ini.</p></div>;
}

function EmptyPackageHint() {
  return <div className="rounded-lg border border-dashed border-border bg-white/70 p-5 text-sm font-bold text-muted">Paket dari admin akan muncul di sini setelah dibuat dan diaktifkan.</div>;
}
