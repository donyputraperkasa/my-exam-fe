"use client";

import { usePathname } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";
import {
  DashboardBreadcrumbs,
  type DashboardBreadcrumbItem,
} from "./dashboard-breadcrumbs";

type DashboardRouteBreadcrumbsProps = {
  role: UserRole;
  title: string;
};

export function DashboardRouteBreadcrumbs({
  role,
  title,
}: DashboardRouteBreadcrumbsProps) {
  const pathname = usePathname();
  const items = getBreadcrumbItems(pathname, role, title);

  return (
    <section className="mb-5 rounded-2xl border border-violet-100 bg-white/90 px-5 py-4 shadow-sm">
      <DashboardBreadcrumbs items={items} />
    </section>
  );
}

function getBreadcrumbItems(pathname: string, role: UserRole, title: string) {
  const root = getDashboardRoot(role);
  const items: DashboardBreadcrumbItem[] = [
    { href: pathname === root ? undefined : root, label: "Dashboard" },
  ];

  if (pathname === root) {
    return items;
  }
  if (role === "STUDENT" && pathname.startsWith(appRoutes.student.packages)) {
    items.push({ href: appRoutes.student.packages, label: "Paket" });
    if (pathname !== appRoutes.student.packages) items.push({ label: title });
    return items;
  }

  const modeRoute = role === "ADMIN" ? appRoutes.admin.teacher : appRoutes.teacher.dashboard;
  const modePrefix = role === "ADMIN" ? appRoutes.admin.teacher : "/teacher";
  if (role !== "STUDENT" && pathname.startsWith(modePrefix)) {
    return addTeacherModeItems(items, pathname, role, modeRoute, title);
  }

  items.push({ label: title });
  return items;
}

function addTeacherModeItems(
  items: DashboardBreadcrumbItem[],
  pathname: string,
  role: Exclude<UserRole, "STUDENT">,
  modeRoute: string,
  title: string,
) {
  if (role === "ADMIN" && pathname !== modeRoute) {
    items.push({ href: modeRoute, label: "Mode Ujian" });
  }
  const exams = role === "ADMIN" ? appRoutes.admin.teacherExams : appRoutes.teacher.exams;
  const monitor = role === "ADMIN" ? appRoutes.admin.teacherMonitor : appRoutes.teacher.monitor;
  const results = role === "ADMIN" ? appRoutes.admin.teacherResults : appRoutes.teacher.results;

  if (pathname.startsWith(exams)) {
    items.push({ href: exams, label: "Buat Ujian" });
    if (pathname !== exams) items.push({ label: title });
  } else if (pathname.startsWith(monitor)) {
    items.push({ href: monitor, label: "Pantau Siswa" });
    if (pathname !== monitor) items.push({ label: title });
  } else if (pathname === results) {
    items.push({ label: "Hasil & Unduh" });
  } else if (pathname === modeRoute) {
    items.push({ label: "Mode Ujian" });
  }
  return items;
}

function getDashboardRoot(role: UserRole) {
  if (role === "ADMIN") return appRoutes.admin.dashboard;
  if (role === "TEACHER") return appRoutes.teacher.dashboard;
  return appRoutes.student.dashboard;
}
