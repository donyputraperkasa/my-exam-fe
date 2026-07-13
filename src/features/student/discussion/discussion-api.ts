import { apiFetch } from "@/lib/api/client";

export type DiscussionVideo = {
  explanationVideoUrl: string;
  grade: { name: string };
  id: string;
  packages: Array<{ package: { id: string; title: string } }>;
  question: string;
  subject: { name: string };
};

export function fetchDiscussionVideos(token: string) {
  return apiFetch<DiscussionVideo[]>("/student/discussion-videos", { token });
}
