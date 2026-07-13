import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DiscussionVideoLibrary } from "@/features/student/discussion/discussion-video-library";

export default function StudentDiscussionPage() {
  return (
    <DashboardShell
      eyebrow="Ruang Belajar"
      role="STUDENT"
      title="Kumpulan Video Pembahasan"
    >
      <DiscussionVideoLibrary />
    </DashboardShell>
  );
}
