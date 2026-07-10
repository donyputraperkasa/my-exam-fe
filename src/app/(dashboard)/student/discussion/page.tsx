import { DashboardShell } from "@/components/layout/dashboard-shell";

const videos = [
  "Trik cepat perkalian dan pembagian",
  "Pembahasan geometri dasar",
  "Cara membaca soal cerita",
];

export default function StudentDiscussionPage() {
  return (
    <DashboardShell
      eyebrow="Ruang Belajar"
      role="STUDENT"
      title="Pembahasan Video"
    >
      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="aspect-video bg-foreground/5">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/6cR5l7cyxAM"
              title="Embed video pembahasan"
              allowFullScreen
            />
          </div>
          <div className="p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
              Video Pembahasan
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Numerasi pemanasan: cara cepat dan pembahasan.
            </h2>
          </div>
        </div>
        <div className="grid gap-3">
          {videos.map((item) => (
            <div key={item} className="rounded-lg border border-border bg-surface p-4">
              <p className="text-sm font-bold">{item}</p>
              <p className="mt-1 text-xs font-semibold text-muted">
                Embed video pembahasan materi siswa.
              </p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
