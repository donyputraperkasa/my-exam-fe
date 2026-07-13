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

export function submitStudentTrial(
  answers: Record<string, string>,
  token: string,
) {
  return submitTrialTo("/student/trial/submit", answers, token);
}

export async function fetchStudentTrialAccess(token: string) {
  const response = await apiFetch<{ subscription: { isActive: boolean } }>(
    "/dashboard/me",
    { token },
  );
  return response.subscription.isActive;
}

function submitTrialTo(
  path: string,
  answers: Record<string, string>,
  token?: string,
) {
  return apiFetch<TrialScore>(path, {
    method: "POST",
    token,
    body: JSON.stringify({
      answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      })),
    }),
  });
}
