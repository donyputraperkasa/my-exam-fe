import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";

export function getDashboardPath(role: UserRole) {
  if (role === "ADMIN") {
    return appRoutes.admin.dashboard;
  }

  if (role === "TEACHER") {
    return appRoutes.teacher.dashboard;
  }

  return appRoutes.student.dashboard;
}
