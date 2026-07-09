"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, X } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { login } from "../api";
import { getDashboardPath } from "../redirect";
import { saveSession } from "../session";
import { AuthField } from "./auth-field";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
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
      const session = await login({ email, password });
      saveSession(session);
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
        className="w-full max-w-md rounded-2xl border border-white/70 bg-white/95 p-5 text-foreground shadow-2xl shadow-secondary/20"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white">
              <LogIn className="h-5 w-5" />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-secondary">
              Masuk My Exam
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Lanjutkan latihanmu.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border p-2 text-muted transition hover:text-foreground"
            aria-label="Tutup modal login"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <AuthField label="Email" type="email" value={email} onChange={setEmail} />
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
            className="h-11 rounded-md bg-primary text-sm font-bold text-white transition hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          Belum punya akun?{" "}
          <Link href={appRoutes.auth.register} className="font-bold text-secondary">
            Daftar gratis
          </Link>
        </p>
      </section>
    </div>
  );
}
