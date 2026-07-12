import { TeacherMonitorDetail } from "@/features/teacher/teacher-monitor-detail";

type TeacherMonitorDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TeacherMonitorDetailPage({
  params,
}: TeacherMonitorDetailPageProps) {
  const { id } = await params;

  return (
    <TeacherMonitorDetail
      allowedRoles={["TEACHER", "ADMIN"]}
      examId={id}
      eyebrow="Teacher Mode"
      role="TEACHER"
    />
  );
}
