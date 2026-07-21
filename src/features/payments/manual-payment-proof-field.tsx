"use client";

import Image from "next/image";
import { DragEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { Eye, ImagePlus, RefreshCw, Trash2, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type Props = {
  file?: File;
  onChange: (file?: File) => void;
  onError: (message: string) => void;
};

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function usePreviewUrl(file?: File) {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return url;
}

export function ManualPaymentProofField({ file, onChange, onError }: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = usePreviewUrl(file);
  const [dragging, setDragging] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  function selectFile(next?: File) {
    if (!next) return;
    if (!next.type.startsWith("image/")) {
      onError("Bukti transfer harus berupa file gambar.");
      return;
    }
    if (next.size > MAX_FILE_SIZE) {
      onError("Ukuran bukti transfer maksimal 5 MB.");
      return;
    }
    onError("");
    onChange(next);
    if (inputRef.current) inputRef.current.value = "";
  }

  function drop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  }

  function removeFile() {
    setPreviewOpen(false);
    onError("");
    onChange(undefined);
  }

  return (
    <div className="mt-5">
      <p className="text-sm font-black text-foreground">Foto bukti transfer</p>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => selectFile(event.target.files?.[0])}
        className="sr-only"
      />

      {file && previewUrl ? (
        <div className="mt-2 overflow-hidden rounded-xl border border-violet-200 bg-violet-50/40">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="group relative block aspect-[16/7] w-full overflow-hidden bg-slate-100"
            aria-label="Lihat bukti transfer lebih besar"
          >
            <Image
              src={previewUrl}
              alt="Preview bukti transfer"
              fill
              unoptimized
              className="object-contain"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-slate-950/0 text-white opacity-0 transition group-hover:bg-slate-950/35 group-hover:opacity-100">
              <Eye className="mr-2 h-5 w-5" /> Lihat foto
            </span>
          </button>
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-foreground">{file.name}</p>
              <p className="mt-1 text-xs font-bold text-muted">
                {formatFileSize(file.size)} - Siap dikirim
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-violet-200 bg-white px-3 text-xs font-black text-violet-700 hover:bg-violet-50"
              >
                <Eye className="h-4 w-4" /> Lihat
              </button>
              <label
                htmlFor={inputId}
                className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-violet-200 bg-white px-3 text-xs font-black text-violet-700 hover:bg-violet-50"
              >
                <RefreshCw className="h-4 w-4" /> Ganti
              </label>
              <button
                type="button"
                onClick={removeFile}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50"
                aria-label="Hapus bukti transfer"
                title="Hapus bukti transfer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragEnter={() => setDragging(true)}
          onDragLeave={() => setDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={drop}
          className={`mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-6 text-center transition ${
            dragging
              ? "border-violet-500 bg-violet-100"
              : "border-violet-200 bg-violet-50/40 hover:border-violet-400 hover:bg-violet-50"
          }`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
            <ImagePlus className="h-6 w-6" />
          </span>
          <span className="mt-3 text-sm font-black text-foreground">
            Unggah bukti transfer
          </span>
          <span className="mt-1 text-xs font-bold leading-5 text-muted">
            Klik atau tarik foto ke sini - JPG, PNG, WEBP - Maks. 5 MB
          </span>
        </label>
      )}

      {previewOpen && previewUrl ? (
        <div
          onMouseDown={(event) =>
            event.target === event.currentTarget && setPreviewOpen(false)
          }
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        >
          <div className="relative h-[min(78dvh,760px)] w-full max-w-4xl overflow-hidden rounded-xl bg-white p-3 shadow-2xl">
            <Image
              src={previewUrl}
              alt="Bukti transfer ukuran penuh"
              fill
              unoptimized
              className="object-contain p-3"
            />
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg hover:bg-violet-50"
              aria-label="Tutup preview bukti transfer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
