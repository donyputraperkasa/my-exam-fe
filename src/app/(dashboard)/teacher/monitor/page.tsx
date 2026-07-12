import { TeacherMonitorWorkspace } from "@/features/teacher/teacher-monitor-workspace";

export default function TeacherMonitorPage() {
  return (
    <TeacherMonitorWorkspace
      allowedRoles={["TEACHER", "ADMIN"]}
      eyebrow="Teacher Mode"
      role="TEACHER"
      title="Pantau Siswa"
    />
  );
}
