import type { Grade, Subject } from "@/types/exam";
import { SubjectList } from "./subject-list";

type SubjectPanelProps = {
  filterGradeId: string;
  grades: Grade[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (item: Subject) => void;
  onFilterChange: (value: string) => void;
  subjects: Subject[];
};

export function SubjectPanel({
  filterGradeId,
  grades,
  loading,
  onDelete,
  onEdit,
  onFilterChange,
  subjects,
}: SubjectPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-black uppercase text-secondary">
          Daftar Mapel
        </p>
        <select
          value={filterGradeId}
          onChange={(event) => onFilterChange(event.target.value)}
          className="h-10 rounded-md border border-border px-3 text-sm font-bold"
        >
          <option value="">Semua jenjang</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>
      <SubjectList
        loading={loading}
        onDelete={onDelete}
        onEdit={onEdit}
        subjects={subjects}
      />
    </div>
  );
}
