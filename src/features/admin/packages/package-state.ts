import type { ExamPackage } from "@/types/exam";
import type { PackagePayload } from "./packages-api";

export const emptyPackage: PackagePayload = {
  accessType: "PREMIUM",
  gradeId: "",
  isActive: true,
  questionIds: [],
  subjectId: "",
  title: "",
};

export function toPackageForm(item: ExamPackage): PackagePayload {
  const questionIds = item.questions?.map((entry) => entry.question.id) ?? [];

  return {
    accessType: item.accessType,
    durationMinutes: item.durationMinutes ?? undefined,
    gradeId: item.gradeId,
    isActive: item.isActive,
    questionIds,
    subjectId: item.subjectId,
    title: item.title,
  };
}
