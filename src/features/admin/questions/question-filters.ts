import type { Question } from "@/types/exam";
import {
  getQuestionPackageNames,
  isUnassignedQuestion,
  QUESTION_FILTER,
} from "./question-category";

export function filterQuestions(
  questions: Question[],
  packageId: string,
  query: string,
) {
  const keyword = query.trim().toLowerCase();

  return questions.filter((question) => {
    const matchPackage = matchesCategory(question, packageId);
    const searchableText = [
      question.question,
      question.grade?.name,
      question.subject?.name,
      question.explanation,
      ...getQuestionPackageNames(question),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchPackage && (!keyword || searchableText.includes(keyword));
  });
}

function matchesCategory(question: Question, selectedId: string) {
  if (selectedId === QUESTION_FILTER.free) return question.isPublicPreview;
  if (selectedId === QUESTION_FILTER.unassigned) {
    return isUnassignedQuestion(question);
  }
  if (!selectedId) return true;

  return question.packages?.some((item) => item.packageId === selectedId);
}
