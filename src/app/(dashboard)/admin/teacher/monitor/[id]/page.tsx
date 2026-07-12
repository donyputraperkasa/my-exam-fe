import { TeacherMonitorDetail } from "@/features/teacher/teacher-monitor-detail";

type AdminTeacherMonitorDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminTeacherMonitorDetailPage({
  params,
}: AdminTeacherMonitorDetailPageProps) {
  const { id } = await params;

  return (
    <TeacherMonitorDetail
      allowedRoles={["ADMIN"]}
      examId={id}
      eyebrow="Admin Panel"
      role="ADMIN"
    />
  );
}
