import { DashboardShell } from "@/components/layout/dashboard-shell";
import { CategoryManager } from "@/features/admin/categories/category-manager";

export default function AdminPackagesPage() {
  return (
    <DashboardShell eyebrow="Admin Panel" role="ADMIN" title="Buat Kategori Soal">
      <CategoryManager />
    </DashboardShell>
  );
}
