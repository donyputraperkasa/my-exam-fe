"use client";

import { ImageIcon, Pencil, Trash2, Video } from "lucide-react";
import type { Question } from "@/types/exam";

type QuestionCardProps = {
    deleting?: boolean;
    onDelete: () => void;
    onEdit: () => void;
    question: Question;
};

export function QuestionCard({
    deleting = false,
    onDelete,
    onEdit,
    question,
}: QuestionCardProps) {
    return (
        <article
        className={`group flex min-h-64 flex-col rounded-2xl border border-border bg-background/70 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-md ${
            deleting ? "pointer-events-none opacity-50" : "opacity-100"
        }`}
        >
        <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-wide text-secondary">
                {question.grade?.name ?? "Tanpa jenjang"} - {question.subject?.name ?? "Tanpa mapel"}
            </p>
            </div>

            <div className="flex shrink-0 gap-2">
            <button
                type="button"
                onClick={onEdit}
                aria-label="Edit soal"
                title="Edit soal"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-foreground shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
                <Pencil className="h-4 w-4" />
            </button>

            <button
                type="button"
                onClick={onDelete}
                aria-label="Hapus soal"
                title="Hapus soal"
                disabled={deleting}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-danger/20 bg-white text-danger shadow-sm transition hover:border-danger hover:bg-danger hover:text-white disabled:cursor-not-allowed"
            >
                <Trash2 className="h-4 w-4" />
            </button>
            </div>
        </div>

        <h3 className="mt-5 line-clamp-4 text-lg font-black leading-7 text-foreground">
            {question.question}
        </h3>

        <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center gap-3 border-t border-border/70 pt-4 text-xs font-bold text-muted">
            <span>{question.options?.length ?? 0} opsi</span>

            {question.explanation ? (
                <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                Pembahasan
                </span>
            ) : null}

            {question.explanationImageUrl ? (
                <span className="inline-flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4" />
                Foto
                </span>
            ) : null}

            {question.explanationVideoUrl ? (
                <span className="inline-flex items-center gap-1.5">
                <Video className="h-4 w-4" />
                Video
                </span>
            ) : null}
            </div>
        </div>
        </article>
    );
}