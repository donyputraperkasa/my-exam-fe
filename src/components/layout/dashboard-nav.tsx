"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  Download,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  ListTree,
  PackageCheck,
  Presentation,
  Video,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";

type NavItem = {
  Icon: LucideIcon;
  href: string;
  label: string;
};

// Menu berbasis role memakai satu renderer supaya aturan sidebar tetap konsisten
// pada dashboard admin, siswa, dan guru.
const navItems: Record<UserRole, NavItem[]> = {
  ADMIN: [
    { label: "Dashboard", href: appRoutes.admin.dashboard, Icon: LayoutDashboard },
    { label: "Buat kategori soal", href: appRoutes.admin.grades, Icon: ListTree },
    { label: "Soal dan pembahasan", href: appRoutes.admin.questions, Icon: FileQuestion },
    { label: "Subscription", href: appRoutes.admin.subscriptions, Icon: Users },
    { label: "Mode Ujian", href: appRoutes.admin.teacher, Icon: Presentation },
    { label: "Private Lesson", href: appRoutes.admin.lessPrivate, Icon: GraduationCap },
  ],
  STUDENT: [
    { label: "Dashboard", href: appRoutes.student.dashboard, Icon: LayoutDashboard },
    { label: "Paket", href: appRoutes.student.packages, Icon: PackageCheck },
    { label: "Recap Nilai", href: appRoutes.student.recap, Icon: ChartNoAxesCombined },
    { label: "Riwayat Subscribe", href: appRoutes.student.subscription, Icon: CreditCard },
    { label: "Pembahasan Video", href: appRoutes.student.discussion, Icon: Video },
    { label: "Les Private", href: appRoutes.student.lessPrivate, Icon: GraduationCap },
  ],
  TEACHER: [
    { label: "Dashboard", href: appRoutes.teacher.dashboard, Icon: LayoutDashboard },
    { label: "Buat Ujian", href: appRoutes.teacher.exams, Icon: ClipboardList },
    { label: "Pantau Siswa", href: appRoutes.teacher.monitor, Icon: UsersRound },
    { label: "Hasil & Unduh", href: appRoutes.teacher.results, Icon: Download },
  ],
};

type DashboardNavProps = {
  role: UserRole;
};

export function DashboardNav({ role }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {navItems[role].map(({ label, href, Icon }) => {
        const active = isActiveItem(pathname, href);
        return (
          <NavLink key={label} Icon={Icon} active={active} href={href} label={label} />
        );
      })}
    </nav>
  );
}

function NavLink({ Icon, active, href, label }: {
  Icon: LucideIcon;
  active: boolean;
  href: string;
  label: string;
}) {
  const stateClass = active
    ? "bg-accent text-foreground shadow-sm shadow-accent/20"
    : "text-muted hover:bg-secondary/10 hover:text-secondary";

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${stateClass}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

// Halaman detail tetap menyalakan menu induknya di sidebar.
function isActiveItem(pathname: string, href: string) {
  return (
    pathname === href ||
    isNestedStudentPackage(pathname, href) ||
    isCategoryPath(pathname, href) ||
    isAdminTeacherPath(pathname, href)
  );
}

function isCategoryPath(pathname: string, href: string) {
  return href === appRoutes.admin.grades && [appRoutes.admin.subjects, appRoutes.admin.packages].includes(pathname);
}

function isNestedStudentPackage(pathname: string, href: string) {
  return href === appRoutes.student.packages && pathname === appRoutes.student.trial;
}

function isAdminTeacherPath(pathname: string, href: string) {
  return href === appRoutes.admin.teacher && pathname.startsWith(appRoutes.admin.teacher);
}
