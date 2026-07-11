import { TeacherExamDetail } from "@/features/teacher/teacher-exam-detail";

type AdminTeacherExamDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminTeacherExamDetailPage({
  params,
}: AdminTeacherExamDetailPageProps) {
  const { id } = await params;

  return (
    <TeacherExamDetail
      allowedRoles={["ADMIN"]}
      examId={id}
      eyebrow="Admin Panel"
      role="ADMIN"
      title="Detail Ujian"
    />
  );
}
