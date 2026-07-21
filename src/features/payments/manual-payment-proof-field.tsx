"use client";

import { DragEvent, useId, useState } from "react";
import { CheckCircle2, ImagePlus } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type Props = {
  file?: File;
  onChange: (file: File) => void;
  onError: (message: string) => void;
};

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export function ManualPaymentProofField({ file, onChange, onError }: Props) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);

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
  }

  function drop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  }

  return (
    <div className="mt-5">
      <p className="text-sm font-black text-foreground">Foto bukti transfer</p>
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
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => selectFile(event.target.files?.[0])}
          className="sr-only"
        />
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
          {file ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <ImagePlus className="h-6 w-6" />
          )}
        </span>
        {file ? (
          <>
            <span className="mt-3 max-w-full truncate text-sm font-black text-foreground">
              {file.name}
            </span>
            <span className="mt-1 text-xs font-bold text-muted">
              {formatFileSize(file.size)} - Klik untuk mengganti
            </span>
          </>
        ) : (
          <>
            <span className="mt-3 text-sm font-black text-foreground">
              Unggah bukti transfer
            </span>
            <span className="mt-1 text-xs font-bold leading-5 text-muted">
              Klik atau tarik foto ke sini - JPG, PNG, WEBP - Maks. 5 MB
            </span>
          </>
        )}
      </label>
    </div>
  );
}
