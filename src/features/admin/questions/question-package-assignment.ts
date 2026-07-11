import type { ExamPackage } from "@/types/exam";
import {
  fetchAdminPackage,
  updateExamPackage,
} from "../packages/packages-api";

export async function assignQuestionToPackages(
  packageIds: string[],
  questionId: string,
  token: string,
) {
  await Promise.all(
    packageIds.map(async (packageId) => {
      const item = await fetchAdminPackage(packageId, token);
      await updateExamPackage(packageId, buildPayload(item, questionId), token);
    }),
  );
}

function buildPayload(item: ExamPackage, questionId: string) {
  const questionIds = item.questions?.map((entry) => entry.question.id) ?? [];

  return {
    accessType: item.accessType,
    durationMinutes: item.durationMinutes ?? undefined,
    gradeId: item.gradeId,
    isActive: item.isActive,
    questionIds: questionIds.includes(questionId)
      ? questionIds
      : [...questionIds, questionId],
    subjectId: item.subjectId,
    title: item.title,
  };
}
