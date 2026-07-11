import { CheckCircle2, PackagePlus } from "lucide-react";
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
      <div className="mt-4 rounded-lg border border-dashed border-border bg-background/70 p-4">
        <p className="flex items-center gap-2 text-sm font-black text-secondary">
          <PackagePlus className="h-4 w-4" /> Paket tujuan
        </p>
        <p className="mt-2 text-sm font-bold text-muted">
          Belum ada paket untuk jenjang dan mapel ini. Buat paket dulu di menu Paket.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-3 rounded-lg border border-border bg-background/45 p-4">
      <div>
        <p className="text-sm font-black text-secondary">Paket tujuan</p>
        <p className="mt-1 text-xs font-bold text-muted">
          Centang paket supaya soal tersimpan rapi dan tidak bercampur.
        </p>
      </div>
      <div className="grid gap-2">
        {filteredPackages.map((item) => (
          <PackageOption key={item.id} form={form} item={item} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}

function PackageOption({
  form,
  item,
  onChange,
}: {
  form: QuestionFormState;
  item: ExamPackage;
  onChange: (form: QuestionFormState) => void;
}) {
  const checked = form.packageIds.includes(item.id);
  const count = item._count?.questions ?? item.questions?.length ?? 0;

  return (
    <label className={`flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3 text-sm font-bold ${checked ? "border-accent bg-accent/15" : "border-border bg-white/82"}`}>
      <span>
        <span className="block text-foreground">{item.title}</span>
        <span className="mt-1 block text-xs text-muted">
          {item.accessType} · {count} soal
        </span>
      </span>
      <span className="inline-flex items-center gap-2">
        {checked ? <CheckCircle2 className="h-5 w-5 text-secondary" /> : null}
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange({ ...form, packageIds: nextPackageIds(form.packageIds, item.id, event.target.checked) })}
          className="h-4 w-4"
        />
      </span>
    </label>
  );
}

function nextPackageIds(ids: string[], id: string, checked: boolean) {
  return checked ? [...ids, id] : ids.filter((item) => item !== id);
}
