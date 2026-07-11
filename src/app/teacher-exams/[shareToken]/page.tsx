import { PublicTeacherExamEntry } from "@/features/teacher/public-teacher-exam-entry";

type PublicTeacherExamPageProps = {
  params: Promise<{ shareToken: string }>;
};

export default async function PublicTeacherExamPage({
  params,
}: PublicTeacherExamPageProps) {
  const { shareToken } = await params;

  return <PublicTeacherExamEntry shareToken={shareToken} />;
}
