import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type DashboardBreadcrumbItem = {
  href?: string;
  label: string;
};

type DashboardBreadcrumbsProps = {
  items: DashboardBreadcrumbItem[];
};

export function DashboardBreadcrumbs({ items }: DashboardBreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-black text-muted">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href && !isLast ? (
              <Link className="transition hover:text-violet-500" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : ""}>{item.label}</span>
            )}
            {!isLast ? <ChevronRight className="h-4 w-4" /> : null}
          </span>
        );
      })}
    </nav>
  );
}
