import type { Question } from "@/types/exam";

export function filterQuestions(
  questions: Question[],
  packageId: string,
  query: string,
) {
  const keyword = query.trim().toLowerCase();

  return questions.filter((question) => {
    const matchPackage = packageId
      ? question.packages?.some((item) => item.packageId === packageId)
      : true;
    const searchableText = [
      question.question,
      question.grade?.name,
      question.subject?.name,
      question.explanation,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchPackage && (!keyword || searchableText.includes(keyword));
  });
}
