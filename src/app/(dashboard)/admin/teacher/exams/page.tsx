import { TeacherExamWorkspace } from "@/features/teacher/teacher-exam-workspace";

export default function AdminTeacherExamsPage() {
  return (
    <TeacherExamWorkspace
      allowedRoles={["ADMIN"]}
      eyebrow="Admin Panel"
      role="ADMIN"
      title="Buat Ujian"
    />
  );
}
