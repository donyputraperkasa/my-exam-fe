import { Pencil, Trash2 } from "lucide-react";
import type { ExamPackage } from "@/types/exam";

type PackageListProps = {
  onDelete: (id: string) => void;
  onEdit: (item: ExamPackage) => void;
  packages: ExamPackage[];
};

export function PackageList({ onDelete, onEdit, packages }: PackageListProps) {
  return (
    <div className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-secondary">Daftar Paket</p>
      <div className="mt-4 grid gap-3">
        {packages.map((item) => (
          <article key={item.id} className="rounded-lg bg-background/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-secondary">
                  {item.grade?.name} - {item.subject?.name}
                </p>
                <h2 className="mt-1 font-black">{item.title}</h2>
                <p className="mt-1 text-xs font-bold text-muted">
                  {item.accessType} · {item._count?.questions ?? 0} soal
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => void onEdit(item)} className="rounded-md border border-border p-2"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => void onDelete(item.id)} className="rounded-md border border-border p-2 text-danger"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
