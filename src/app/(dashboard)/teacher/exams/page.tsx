import { TeacherExamWorkspace } from "@/features/teacher/teacher-exam-workspace";

export default function TeacherExamsPage() {
  return (
    <TeacherExamWorkspace
      allowedRoles={["TEACHER", "ADMIN"]}
      eyebrow="Teacher Mode"
      role="TEACHER"
      title="Buat Ujian"
    />
  );
}
