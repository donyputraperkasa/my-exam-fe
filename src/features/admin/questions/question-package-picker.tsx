import type { ExamPackage } from "@/types/exam";
import type { QuestionFormState } from "./question-state";

type QuestionPackagePickerProps = {
  form: QuestionFormState;
  onChange: (form: QuestionFormState) => void;
  packages: ExamPackage[];
};

export function QuestionPackagePicker({
  form,
  onChange,
  packages,
}: QuestionPackagePickerProps) {
  const filteredPackages = packages.filter((item) => {
    return item.gradeId === form.gradeId && item.subjectId === form.subjectId;
  });

  if (!filteredPackages.length) {
    return (
      <p className="mt-4 rounded-md bg-background/80 p-3 text-sm font-bold text-muted">
        Belum ada paket untuk jenjang dan mapel ini.
      </p>
    );
  }

  return (
    <div className="mt-4 grid gap-2">
      <p className="text-sm font-black text-secondary">Masukkan ke paket</p>
      <select
        multiple
        value={form.packageIds}
        onChange={(event) => {
          const packageIds = Array.from(event.target.selectedOptions).map(
            (option) => option.value,
          );
          onChange({ ...form, packageIds });
        }}
        className="min-h-28 rounded-md border border-border bg-white px-3 py-2 text-sm font-bold outline-none focus:border-primary"
      >
        {filteredPackages.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <p className="text-xs font-bold text-muted">
        Tahan Cmd/Ctrl untuk memilih lebih dari satu paket.
      </p>
    </div>
  );
}
