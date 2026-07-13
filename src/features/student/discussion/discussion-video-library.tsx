"use client";

import { useEffect, useMemo, useState } from "react";
import { PlayCircle } from "lucide-react";
import { getToken } from "@/features/auth/session";
import { fetchDiscussionVideos, type DiscussionVideo } from "./discussion-api";
import { toYoutubeEmbedUrl } from "./youtube-url";

export function DiscussionVideoLibrary() {
  const [videos, setVideos] = useState<DiscussionVideo[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const selected = useMemo(
    () => videos.find((video) => video.id === selectedId) ?? videos[0],
    [selectedId, videos],
  );
  const embedUrl = selected ? toYoutubeEmbedUrl(selected.explanationVideoUrl) : "";

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
    <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <article className="overflow-hidden rounded-2xl border border-violet-100 bg-white/90 shadow-sm">
        <div className="aspect-video bg-slate-950">
          {embedUrl ? <iframe className="h-full w-full" src={embedUrl} title={selected.question} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <p className="flex h-full items-center justify-center p-6 text-center text-sm font-bold text-white">Link video belum valid. Hubungi admin.</p>}
        </div>
        <div className="p-5">
          <p className="text-sm font-black uppercase text-pink-400">{selected.grade.name} · {selected.subject.name}</p>
          <h2 className="mt-2 text-2xl font-black">{selected.question}</h2>
        </div>
      </article>
      <div className="grid content-start gap-3">
        {videos.map((video) => (
          <button key={video.id} type="button" onClick={() => setSelectedId(video.id)} className={`rounded-xl border p-4 text-left transition ${selected.id === video.id ? "border-amber-300 bg-amber-50" : "border-violet-100 bg-white/90 hover:border-violet-300"}`}>
            <p className="font-black">{video.question}</p>
            <p className="mt-1 text-xs font-bold text-muted">{video.subject.name} · {video.packages[0]?.package.title ?? "Bank soal"}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
