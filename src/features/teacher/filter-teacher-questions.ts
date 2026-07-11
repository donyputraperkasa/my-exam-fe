import type { TeacherQuestion } from "./api";

export function filterTeacherQuestions(
  questions: TeacherQuestion[],
  query: string,
) {
  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    return questions;
  }

  return questions.filter((question) => {
    const values = [
      question.question,
      question.explanation ?? "",
      ...question.options.map((option) => `${option.label} ${option.text}`),
    ];

    return values.some((value) => value.toLowerCase().includes(keyword));
  });
}
