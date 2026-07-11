

"use client";

import { Box, Clock3, Pencil, Trash2 } from "lucide-react";
import type { ExamPackage } from "@/types/exam";

type PackageCardProps = {
  item: ExamPackage;
  selected?: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function PackageCard({ item, selected = false, onSelect, onEdit, onDelete }: PackageCardProps) {
  return (
    <article
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-md ${selected ? "border-primary bg-primary/5" : "border-border bg-background/80 hover:border-primary/30"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Box className="mb-3 h-8 w-8 text-primary" />
          <p className="text-xs font-black uppercase text-secondary">
            {item.grade?.name} • {item.subject?.name}
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-black">{item.title}</h3>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={(e)=>{e.stopPropagation();onEdit();}} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white hover:border-primary hover:bg-primary hover:text-white">
            <Pencil className="h-4 w-4" />
          </button>
          <button type="button" onClick={(e)=>{e.stopPropagation();onDelete();}} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-danger/30 bg-white text-danger hover:bg-danger hover:text-white">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-muted">
        <span className="rounded-full bg-white px-3 py-1 shadow-sm">{item.accessType}</span>
        <span className="rounded-full bg-white px-3 py-1 shadow-sm">{item._count?.questions ?? 0} soal</span>
        {item.durationMinutes ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-sm"><Clock3 className="h-3.5 w-3.5" />{item.durationMinutes} menit</span>
        ) : null}
      </div>
    </article>
  );
}