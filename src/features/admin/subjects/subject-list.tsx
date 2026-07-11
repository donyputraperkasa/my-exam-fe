import { Pencil, Trash2 } from "lucide-react";
import type { Subject } from "@/types/exam";

type SubjectListProps = {
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (item: Subject) => void;
  subjects: Subject[];
};

export function SubjectList({
  loading,
  onDelete,
  onEdit,
  subjects,
}: SubjectListProps) {
  if (loading) {
    return <p className="mt-4 text-sm text-muted">Memuat mapel...</p>;
  }

  return (
    <div className="mt-4 grid gap-3">
      {subjects.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-3 rounded-lg bg-background/80 p-4"
        >
          <div>
            <p className="font-black">{item.name}</p>
            <p className="mt-1 text-xs font-bold text-muted">
              {item.grade?.name}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="rounded-md border border-border p-2"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => void onDelete(item.id)}
              className="rounded-md border border-border p-2 text-danger"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
