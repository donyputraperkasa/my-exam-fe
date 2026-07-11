import { TeacherDashboard } from "@/features/teacher/teacher-dashboard";

export default function AdminTeacherPage() {
  return (
    <TeacherDashboard
      allowedRoles={["ADMIN"]}
      eyebrow="Admin Panel"
      role="ADMIN"
      title="Mode Ujian"
    />
  );
}
