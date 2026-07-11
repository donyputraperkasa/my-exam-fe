import { apiFetch } from "@/lib/api/client";
import type { TrialQuestion, TrialScore } from "./trial-types";

type ApiTrialOption = {
  id: string;
  label: string;
  text: string;
};

type ApiTrialQuestion = {
  id: string;
  question: string;
  options: ApiTrialOption[];
};

export async function fetchPublicTrialQuestions() {
  const response = await apiFetch<{ data: ApiTrialQuestion[] }>(
    "/public/trial/questions",
  );

  return response.data.map<TrialQuestion>((item) => ({
    id: item.id,
    question: item.question,
    options: item.options,
  }));
}

export function submitPublicTrial(answers: Record<string, string>) {
  return apiFetch<TrialScore>("/public/trial/submit", {
    method: "POST",
    body: JSON.stringify({
      answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      })),
    }),
  });
}
