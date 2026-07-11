"use client";

import { BookOpenCheck, GraduationCap, PackageCheck } from "lucide-react";
import { GradeManager } from "@/features/admin/grades/grade-manager";
import { PackageManager } from "@/features/admin/packages/package-manager";
import { SubjectManager } from "@/features/admin/subjects/subject-manager";

const categoryItems = [
  {
    Icon: GraduationCap,
    title: "Jenjang",
    text: "Buat level seperti SD, SMP, SMA, atau jenjang khusus.",
  },
  {
    Icon: BookOpenCheck,
    title: "Mapel",
    text: "Hubungkan mapel ke jenjang supaya soal tidak bercampur.",
  },
  {
    Icon: PackageCheck,
    title: "Paket",
    text: "Buat folder latihan untuk soal gratis dan premium.",
  },
];

export function CategoryManager() {
  return (
    <section className="grid gap-5">
      <div className="overflow-hidden rounded-2xl border border-border bg-white/90 p-5 shadow-sm">
        <p className="text-sm font-black uppercase text-secondary">Setup awal bank soal</p>
        <h2 className="mt-2 text-3xl font-black">Buat kategori soal dalam satu tempat.</h2>
        <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-muted">
          Mulai dari jenjang, lanjut mapel, lalu buat paket sebagai folder latihan.
          Setelah itu soal bisa dimasukkan dari halaman Soal dan Pembahasan.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {categoryItems.map(({ Icon, text, title }) => (
          <article key={title} className="rounded-2xl border border-border bg-background/70 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-black">{title}</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-muted">{text}</p>
          </article>
        ))}
      </div>

      <section className="grid gap-4 rounded-2xl border border-border bg-white/72 p-4 shadow-sm">
        <SectionTitle title="Jenjang" text="Tentukan level belajar siswa." />
        <GradeManager />
      </section>

      <section className="grid gap-4 rounded-2xl border border-border bg-white/72 p-4 shadow-sm">
        <SectionTitle title="Mapel" text="Setiap mapel harus terhubung ke jenjang." />
        <SubjectManager />
      </section>

      <section className="grid gap-4 rounded-2xl border border-border bg-white/72 p-4 shadow-sm">
        <SectionTitle title="Paket" text="Paket menjadi folder soal untuk siswa." />
        <PackageManager />
      </section>
    </section>
  );
}

function SectionTitle({ text, title }: { text: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-black uppercase text-secondary">{title}</p>
      <p className="mt-1 text-sm font-bold text-muted">{text}</p>
    </div>
  );
}
