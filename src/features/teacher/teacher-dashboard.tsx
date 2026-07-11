"use client";

import Link from "next/link";
import { ClipboardList, Download, UsersRound, type LucideIcon } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";

type TeacherDashboardProps = {
  allowedRoles?: UserRole[];
  eyebrow?: string;
  role?: UserRole;
  title?: string;
};

export function TeacherDashboard({
  allowedRoles = ["TEACHER", "ADMIN"],
  eyebrow = "Teacher Mode",
  role = "TEACHER",
  title = "Dashboard Guru",
}: TeacherDashboardProps) {
  const routes = getTeacherModeRoutes(role);
  const cards = [
    {
      badge: "Buat soal",
      Icon: ClipboardList,
      href: routes.exams,
      title: "Buat Ujian",
      text: "Buat draft ujian, atur timer, PIN, lalu isi soal dan kunci jawaban.",
    },
    {
      badge: "Live progress",
      Icon: UsersRound,
      href: routes.monitor,
      title: "Pantau Siswa",
      text: "Lihat siswa yang masuk, progres pengerjaan, dan aktivitas ujian.",
    },
    {
      badge: "Export nilai",
      Icon: Download,
      href: routes.results,
      title: "Hasil & Unduh",
      text: "Cek nilai akhir, detail jawaban, lalu unduh hasil ujian siswa.",
    },
  ];
  return (
    <DashboardShell
      allowedRoles={allowedRoles} eyebrow={eyebrow} role={role} title={title}
    >
      <section className="grid gap-5 lg:grid-cols-3">
        {cards.map((card) => (
          <TeacherModeCard key={card.title} {...card} />
        ))}
      </section>
    </DashboardShell>
  );
}

function TeacherModeCard({ Icon, badge, href, text, title }: {
  Icon: LucideIcon;
  badge: string;
  href: string;
  text: string;
  title: string;
}) {
  return (
    <Link href={href} className="group rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-violet-100">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 group-hover:bg-accent group-hover:text-foreground">
        <Icon className="h-7 w-7" />
      </span>
      <p className="mt-8 text-sm font-black uppercase text-pink-400">{title}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">{badge}</h2>
      <p className="mt-4 min-h-16 text-sm font-bold leading-6 text-muted">{text}</p>
      <p className="mt-8 text-sm font-black text-violet-500">Buka halaman</p>
    </Link>
  );
}

function getTeacherModeRoutes(role: UserRole) {
  return role === "ADMIN"
    ? {
        exams: appRoutes.admin.teacherExams,
        monitor: appRoutes.admin.teacherMonitor,
        results: appRoutes.admin.teacherResults,
      }
    : appRoutes.teacher;
}
