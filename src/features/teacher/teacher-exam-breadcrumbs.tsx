import { DashboardBreadcrumbs } from "@/components/layout/dashboard-breadcrumbs";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";

type TeacherExamBreadcrumbsProps = {
  role: UserRole;
};

export function TeacherExamBreadcrumbs({ role }: TeacherExamBreadcrumbsProps) {
  const items = role === "ADMIN"
    ? [
        { href: appRoutes.admin.teacher, label: "Mode Ujian" },
        { href: appRoutes.admin.teacherExams, label: "Buat Ujian" },
        { label: "Detail Ujian" },
      ]
    : [
        { href: appRoutes.teacher.dashboard, label: "Dashboard Guru" },
        { href: appRoutes.teacher.exams, label: "Buat Ujian" },
        { label: "Detail Ujian" },
      ];

  return (
    <section className="rounded-3xl border border-violet-100 bg-white/90 p-5 shadow-sm">
      <DashboardBreadcrumbs items={items} />
    </section>
  );
}
