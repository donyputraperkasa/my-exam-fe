import { TeacherMonitorWorkspace } from "@/features/teacher/teacher-monitor-workspace";

export default function AdminTeacherMonitorPage() {
  return (
    <TeacherMonitorWorkspace
      allowedRoles={["ADMIN"]}
      eyebrow="Admin Panel"
      role="ADMIN"
      title="Pantau Siswa"
    />
  );
}
