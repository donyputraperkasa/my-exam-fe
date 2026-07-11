import { TeacherExamDetail } from "@/features/teacher/teacher-exam-detail";

type TeacherExamDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TeacherExamDetailPage({
  params,
}: TeacherExamDetailPageProps) {
  const { id } = await params;

  return (
    <TeacherExamDetail
      allowedRoles={["TEACHER", "ADMIN"]}
      examId={id}
      eyebrow="Teacher Mode"
      role="TEACHER"
      title="Detail Ujian"
    />
  );
}
