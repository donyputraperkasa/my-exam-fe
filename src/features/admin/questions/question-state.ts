import type { Difficulty, Question, QuestionOption } from "@/types/exam";
import { env } from "@/lib/env";
import type { QuestionPayload } from "./questions-api";

export type QuestionFormState = {
  difficulty: Difficulty;
  explanation: string;
  explanationImageUrl: string;
  explanationVideoUrl: string;
  gradeId: string;
  isActive: boolean;
  isPublicPreview: boolean;
  options: QuestionOption[];
  packageIds: string[];
  question: string;
  subjectId: string;
};

export const defaultOptions = ["A", "B", "C", "D", "E"].map((label, index) => ({
  label,
  text: "",
  isCorrect: index === 0,
}));

export function createEmptyQuestionForm(
  gradeId = "",
  subjectId = "",
): QuestionFormState {
  return {
    difficulty: "MEDIUM",
    explanation: "",
    explanationImageUrl: "",
    explanationVideoUrl: "",
    gradeId,
    isActive: true,
    isPublicPreview: false,
    options: defaultOptions,
    packageIds: [],
    question: "",
    subjectId,
  };
}

export function mapQuestionToForm(question: Question): QuestionFormState {
  return {
    difficulty: question.difficulty,
    explanation: question.explanation ?? "",
    explanationImageUrl: question.explanationImageUrl ?? "",
    explanationVideoUrl: question.explanationVideoUrl ?? "",
    gradeId: question.gradeId,
    isActive: question.isActive,
    isPublicPreview: question.isPublicPreview,
    options: question.options.map((option) => ({ ...option })),
    packageIds: question.packages?.map((item) => item.packageId) ?? [],
    question: question.question,
    subjectId: question.subjectId,
  };
}

export function mapFormToPayload(form: QuestionFormState): QuestionPayload {
  const options = form.options.filter((option) => option.text.trim());
  if (options.length < 2) {
    throw new Error("Minimal isi 2 pilihan jawaban");
  }
  if (!options.some((option) => option.isCorrect)) {
    throw new Error("Jawaban benar harus berada di opsi yang terisi");
  }

  return {
    difficulty: form.difficulty,
    explanation: form.explanation || undefined,
    explanationImageUrl: normalizeImageUrl(form.explanationImageUrl),
    explanationVideoUrl: form.explanationVideoUrl || undefined,
    gradeId: form.gradeId,
    isActive: form.isActive,
    isPublicPreview: form.isPublicPreview,
    options: options.map(({ isCorrect, label, text }) => ({
      isCorrect,
      label,
      text: text.trim(),
    })),
    packageIds: form.packageIds,
    question: form.question,
    subjectId: form.subjectId,
  };
}

function normalizeImageUrl(value: string) {
  const imageUrl = value.trim();
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("/")) return `${env.apiBaseUrl}${imageUrl}`;
  return `${env.apiBaseUrl}/uploads/explanations/${imageUrl}`;
}
