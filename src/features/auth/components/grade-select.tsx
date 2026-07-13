"use client";

import { useEffect, useState } from "react";
import { fetchPublicGrades, type PublicGrade } from "../public-grades-api";

type GradeSelectProps = {
  value: string;
  onChange: (id: string, name: string) => void;
};

export function GradeSelect({ value, onChange }: GradeSelectProps) {
  const [grades, setGrades] = useState<PublicGrade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicGrades()
      .then((items) => {
        setGrades(items);
        if (!value && items[0]) onChange(items[0].id, items[0].name);
      })
      .finally(() => setLoading(false));
  }, [onChange, value]);

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
      Jenjang
      <select
        required
        value={value}
        disabled={loading || !grades.length}
        onChange={(event) => {
          const grade = grades.find((item) => item.id === event.target.value);
          if (grade) onChange(grade.id, grade.name);
        }}
        className="h-11 rounded-md border border-border bg-white px-3 text-sm outline-none transition focus:border-secondary"
      >
        {!grades.length ? <option value="">Jenjang belum tersedia</option> : null}
        {grades.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.name}
          </option>
        ))}
      </select>
    </label>
  );
}
