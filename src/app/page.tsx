import Link from "next/link";
import { appRoutes } from "@/lib/routes";

const menuItems = [
  {
    title: "Admin",
    description: "Kelola jenjang, mapel, soal, paket, dan subscription.",
    href: appRoutes.admin.dashboard,
  },
  {
    title: "Siswa",
    description: "Kerjakan paket latihan, lihat nilai, dan baca pembahasan.",
    href: appRoutes.student.dashboard,
  },
  {
    title: "Masuk",
    description: "Login untuk melanjutkan progres belajar.",
    href: appRoutes.auth.login,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            My Exam
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Latihan matematika untuk TKA dan ASPD.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Struktur awal frontend sudah siap untuk admin, siswa, auth, dan
            integrasi API backend.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300"
            >
              <h2 className="text-lg font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
