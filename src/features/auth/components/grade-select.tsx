import type { StudentGrade } from "@/types/auth";

const grades: StudentGrade[] = ["SD", "SMP", "SMA", "SMK"];

type GradeSelectProps = {
  value: StudentGrade;
  onChange: (value: StudentGrade) => void;
};

export function GradeSelect({ value, onChange }: GradeSelectProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
      Jenjang
      <select
        required
        value={value}
        onChange={(event) => onChange(event.target.value as StudentGrade)}
        className="h-11 rounded-md border border-border bg-white px-3 text-sm outline-none transition focus:border-secondary"
      >
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </label>
  );
}
