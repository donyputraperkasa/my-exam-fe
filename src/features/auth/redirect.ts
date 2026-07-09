import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";

export function getDashboardPath(role: UserRole) {
  return role === "ADMIN"
    ? appRoutes.admin.dashboard
    : appRoutes.student.dashboard;
}
