import { DashboardBreadcrumbs } from "@/components/layout/dashboard-breadcrumbs";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";

type TeacherMonitorBreadcrumbsProps = {
  examTitle?: string;
  role: UserRole;
};

export function TeacherMonitorBreadcrumbs({ examTitle, role }: TeacherMonitorBreadcrumbsProps) {
  const monitorRoute = role === "ADMIN"
    ? appRoutes.admin.teacherMonitor
    : appRoutes.teacher.monitor;
  const items = role === "ADMIN"
    ? [
        { href: appRoutes.admin.teacher, label: "Mode Ujian" },
        { href: examTitle ? monitorRoute : undefined, label: "Pantau Siswa" },
      ]
    : [
        { href: appRoutes.teacher.dashboard, label: "Dashboard Guru" },
        { href: examTitle ? monitorRoute : undefined, label: "Pantau Siswa" },
      ];

  if (examTitle) {
    items.push({ href: undefined, label: examTitle });
  }

  return (
    <section className="rounded-3xl border border-violet-100 bg-white/90 p-5 shadow-sm">
      <DashboardBreadcrumbs items={items} />
    </section>
  );
}
