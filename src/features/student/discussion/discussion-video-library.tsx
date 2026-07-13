"use client";

import { useEffect, useMemo, useState } from "react";
import { PlayCircle } from "lucide-react";
import { getToken } from "@/features/auth/session";
import { fetchDiscussionVideos, type DiscussionVideo } from "./discussion-api";
import { DiscussionVideoFilters } from "./discussion-video-filters";
import { toYoutubeEmbedUrl } from "./youtube-url";

export function DiscussionVideoLibrary() {
  const [videos, setVideos] = useState<DiscussionVideo[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [packageId, setPackageId] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const filtered = useMemo(() => filterVideos(videos, query, packageId, subject), [videos, query, packageId, subject]);
  const selected = useMemo(
    () => filtered.find((video) => video.id === selectedId) ?? filtered[0],
    [selectedId, filtered],
  );
  const embedUrl = selected ? toYoutubeEmbedUrl(selected.explanationVideoUrl) : "";
  const packages = useMemo(() => uniquePackages(videos), [videos]);
  const subjects = useMemo(() => Array.from(new Set(videos.map((video) => video.subject.name))).sort(), [videos]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchDiscussionVideos(token)
      .then(setVideos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="rounded-2xl bg-white/90 p-5 text-sm font-bold text-muted">Memuat video pembahasan...</p>;
  }
  if (!videos.length) {
    return (
      <section className="rounded-2xl border border-violet-100 bg-white/90 p-8 text-center shadow-sm">
        <PlayCircle className="mx-auto h-10 w-10 text-violet-400" />
        <h2 className="mt-4 text-2xl font-black">Belum ada video pembahasan.</h2>
        <p className="mt-2 text-sm font-bold text-muted">Video muncul setelah admin menambahkan link pada soal yang dapat kamu akses.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <DiscussionVideoFilters packages={packages} subjects={subjects} query={query} packageId={packageId} subject={subject} onQueryChange={setQuery} onPackageChange={setPackageId} onSubjectChange={setSubject} />
      {!selected ? <p className="rounded-lg border border-dashed border-border bg-white/70 p-6 text-sm font-bold text-muted">Tidak ada video yang sesuai filter.</p> : (
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <article className="overflow-hidden rounded-2xl border border-violet-100 bg-white/90 shadow-sm">
        <div className="aspect-video bg-slate-950">
          {embedUrl ? <iframe className="h-full w-full" src={embedUrl} title={selected.question} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <p className="flex h-full items-center justify-center p-6 text-center text-sm font-bold text-white">Link video belum valid. Hubungi admin.</p>}
        </div>
        <div className="p-5">
          <p className="text-sm font-black uppercase text-pink-400">{selected.grade.name} · {selected.subject.name}</p>
          <h2 className="mt-2 text-2xl font-black">{selected.question}</h2>
        </div>
      </article>
      <div className="grid max-h-[42rem] content-start gap-3 overflow-y-auto pr-1">
        <p className="text-sm font-black text-muted">{filtered.length} video ditemukan</p>
        {filtered.map((video) => (
          <button key={video.id} type="button" onClick={() => setSelectedId(video.id)} className={`rounded-xl border p-4 text-left transition ${selected.id === video.id ? "border-amber-300 bg-amber-50" : "border-violet-100 bg-white/90 hover:border-violet-300"}`}>
            <p className="font-black">{video.question}</p>
            <p className="mt-1 text-xs font-bold text-muted">{video.subject.name} · {video.packages[0]?.package.title ?? "Bank soal"}</p>
          </button>
        ))}
      </div>
      </div>
      )}
    </section>
  );
}

function filterVideos(videos: DiscussionVideo[], query: string, packageId: string, subject: string) {
  const keyword = query.trim().toLowerCase();
  return videos.filter((video) => {
    const packageMatch = !packageId || video.packages.some((item) => item.package.id === packageId);
    const subjectMatch = !subject || video.subject.name === subject;
    const text = [video.question, video.subject.name, ...video.packages.map((item) => item.package.title)].join(" ").toLowerCase();
    return packageMatch && subjectMatch && (!keyword || text.includes(keyword));
  });
}

function uniquePackages(videos: DiscussionVideo[]) {
  const items = new Map<string, string>();
  videos.forEach((video) => video.packages.forEach(({ package: item }) => items.set(item.id, item.title)));
  return Array.from(items, ([id, label]) => ({ id, label })).sort((a, b) => a.label.localeCompare(b.label));
}
