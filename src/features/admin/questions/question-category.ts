import type { Question } from "@/types/exam";

export const QUESTION_FILTER = {
  all: "",
  free: "__free__",
  unassigned: "__unassigned__",
} as const;

export function isUnassignedQuestion(question: Question) {
  return !question.isPublicPreview && !question.packages?.length;
}

export function getQuestionPackageNames(question: Question) {
  return (question.packages ?? [])
    .map((item) => item.package?.title)
    .filter((title): title is string => Boolean(title));
}
