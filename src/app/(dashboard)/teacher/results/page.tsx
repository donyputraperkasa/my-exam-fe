import { TeacherResultsWorkspace } from "@/features/teacher/teacher-results-workspace";

export default function TeacherResultsPage() {
  return (
    <TeacherResultsWorkspace
      allowedRoles={["TEACHER", "ADMIN"]}
      eyebrow="Teacher Mode"
      role="TEACHER"
    />
  );
}
