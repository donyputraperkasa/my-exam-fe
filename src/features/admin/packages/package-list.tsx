import { PackageCard } from "@/components/admin/packages/package-card";
import type { ExamPackage } from "@/types/exam";

type PackageListProps = {
  onDelete: (id: string) => void;
  onEdit: (item: ExamPackage) => void;
  onSelect: (item: ExamPackage) => void;
  packages: ExamPackage[];
  selectedId: string;
};

export function PackageList(props: PackageListProps) {
  return (
    <div className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-secondary">Daftar Paket</p>
      {!props.packages.length ? <p className="mt-4 text-sm font-bold text-muted">Belum ada paket.</p> : null}
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {props.packages.map((item) => (
          <PackageCard
            key={item.id}
            item={item}
            selected={props.selectedId === item.id}
            onSelect={() => props.onSelect(item)}
            onEdit={() => props.onEdit(item)}
            onDelete={() => props.onDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
