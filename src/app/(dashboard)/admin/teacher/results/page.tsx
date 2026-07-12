import { TeacherResultsWorkspace } from "@/features/teacher/teacher-results-workspace";

export default function AdminTeacherResultsPage() {
  return (
    <TeacherResultsWorkspace
      allowedRoles={["ADMIN"]}
      eyebrow="Admin Panel"
      role="ADMIN"
    />
  );
}
