import type { TeacherExam, TeacherExamParticipant } from "./api";

function csvCell(value: string | number | null) {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) {
    text = `'${text}`;
  }
  return `"${text.replaceAll('"', '""')}"`;
}

export function downloadTeacherResults(
  exam: TeacherExam,
  participants: TeacherExamParticipant[],
) {
  const rows = participants.map((item) => [
    item.name,
    item.attendanceNumber,
    item.className,
    item.correctAnswers,
    item.wrongAnswers,
    item.score,
    item.status,
  ]);
  const headers = ["Nama siswa", "Nomor absen", "Kelas", "Benar", "Salah", "Skor", "Status"];
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `hasil-${exam.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
