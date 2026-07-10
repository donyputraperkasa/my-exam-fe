"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, X } from "lucide-react";
import type { StudentGrade } from "@/types/auth";
import { register } from "../api";
import { getDashboardPath } from "../redirect";
import { saveSelectedGrade, saveSession } from "../session";
import { AuthField } from "./auth-field";
import { GradeSelect } from "./grade-select";

type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
};

export function RegisterModal({
  open,
  onClose,
  onOpenLogin,
}: RegisterModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState<StudentGrade>("SD");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await register({ name, email, password });
      saveSession(session);
      saveSelectedGrade(grade);
      onClose();
      router.replace(getDashboardPath(session.user.role));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Terjadi kesalahan",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/50 px-4 backdrop-blur-sm"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/70 bg-white/95 p-5 text-foreground shadow-2xl shadow-accent/20"
      >
        <ModalHeader onClose={onClose} />
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <AuthField label="Nama" value={name} onChange={setName} />
          <AuthField label="Email" type="email" value={email} onChange={setEmail} />
          <GradeSelect value={grade} onChange={setGrade} />
          <AuthField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-md bg-accent text-sm font-bold text-foreground transition hover:bg-amber-400 disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Mulai Gratis"}
          </button>
        </form>
        <button
          type="button"
          onClick={onOpenLogin}
          className="mt-4 w-full text-center text-sm font-bold text-secondary"
        >
          Sudah punya akun? Masuk
        </button>
      </section>
    </div>
  );
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-foreground">
          <UserPlus className="h-5 w-5" />
        </span>
        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-secondary">
          Akun Gratis
        </p>
        <h2 className="mt-2 text-2xl font-extrabold">Mulai latihan hari ini.</h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full border border-border p-2 text-muted transition hover:text-foreground"
        aria-label="Tutup modal daftar"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
