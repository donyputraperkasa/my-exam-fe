"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenCheck,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  PackageCheck,
  Users,
} from "lucide-react";
import { appRoutes } from "@/lib/routes";
import type { UserRole } from "@/types/auth";

const navItems = {
  ADMIN: [
    { label: "Dashboard", href: appRoutes.admin.dashboard, Icon: LayoutDashboard },
    { label: "Jenjang", href: appRoutes.admin.grades, Icon: GraduationCap },
    { label: "Mapel", href: appRoutes.admin.subjects, Icon: BookOpenCheck },
    { label: "Soal", href: appRoutes.admin.questions, Icon: FileQuestion },
    { label: "Paket", href: appRoutes.admin.packages, Icon: PackageCheck },
    { label: "Subscription", href: appRoutes.admin.subscriptions, Icon: Users },
  ],
  STUDENT: [
    { label: "Dashboard", href: appRoutes.student.dashboard, Icon: LayoutDashboard },
    { label: "Paket", href: appRoutes.student.packages, Icon: PackageCheck },
    { label: "Recap", href: appRoutes.student.recap, Icon: ChartNoAxesCombined },
    { label: "Subscribe", href: appRoutes.student.subscription, Icon: CreditCard },
    { label: "Pembahasan", href: appRoutes.student.packages, Icon: ClipboardList },
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
        const active = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              active
                ? "bg-accent text-foreground shadow-sm shadow-accent/20"
                : "text-muted hover:bg-secondary/10 hover:text-secondary"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
