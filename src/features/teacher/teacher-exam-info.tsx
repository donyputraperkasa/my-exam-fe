"use client";

import { useState } from "react";
import { CalendarClock, Coins, Copy, Send } from "lucide-react";
import type { TeacherCreditSummary } from "./credit-api";

type TeacherExamInfoProps = {
  accessExpiresAt: string | null;
  credits: TeacherCreditSummary | null;
  creditsLoading: boolean;
  onNeedCredit: () => void;
  pin: string;
  publish: () => Promise<void>;
  saving: boolean;
  shareToken: string;
  status: string;
  title: string;
};

export function TeacherExamInfo(props: TeacherExamInfoProps) {
  const [copied, setCopied] = useState(false);
  const creditLabel = props.credits?.isUnlimited
    ? "Akses owner"
    : `${props.credits?.balance ?? 0} kredit`;

  function copyLink() {
    void navigator.clipboard?.writeText(
      `${window.location.origin}/teacher-exams/${props.shareToken}`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function handlePublish() {
    if (!props.credits?.isUnlimited && (props.credits?.balance ?? 0) < 1) {
      props.onNeedCredit();
      return;
    }
    void props.publish();
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase text-pink-400">Detail ujian</p>
          <h2 className="mt-2 text-3xl font-black">{props.title}</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-black text-amber-700">
          <Coins className="h-4 w-4" /> {props.creditsLoading ? "Memuat..." : creditLabel}
        </span>
      </div>
      <div className="mt-5 grid gap-3 text-sm font-bold text-muted">
        <p>PIN: <span className="text-foreground">{props.pin}</span></p>
        <p>Status: <span className="text-foreground">{props.status}</span></p>
        {props.accessExpiresAt ? (
          <p className="inline-flex items-center gap-2">
            <CalendarClock className="h-4 w-4" /> Aktif sampai {formatDate(props.accessExpiresAt)}
          </p>
        ) : null}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-black transition ${copied ? "border-green-100 bg-green-50 text-green-600" : "border-violet-100 text-violet-500"}`} onClick={copyLink} type="button">
          <Copy className="h-4 w-4" /> {copied ? "Link Tersalin" : "Salin Link"}
        </button>
        <button type="button" disabled={props.saving || props.creditsLoading || props.status !== "DRAFT"} onClick={handlePublish} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-black disabled:opacity-60">
          <Send className="h-4 w-4" /> {props.status === "DRAFT" ? "Publish - 1 kredit" : "Sudah dipublikasikan"}
        </button>
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}
