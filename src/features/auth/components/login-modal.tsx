"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { login } from "../api";
import { getDashboardPath } from "../redirect";
import { saveSession } from "../session";
import { AuthField } from "./auth-field";
import { AuthModalHeader } from "./auth-modal-header";
import {
  AuthTransitionOverlay,
  waitForAuthTransition,
} from "./auth-transition-overlay";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
};

export function LoginModal({
  open,
  onClose,
  onOpenRegister,
}: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
      await waitForAuthTransition();
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

  function handleOpenRegister() {
    onClose();
    onOpenRegister();
  }

  return (
    <>
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/50 px-4 backdrop-blur-sm"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-violet-100 bg-white/95 text-foreground shadow-2xl shadow-violet-100"
      >
        <div className="border-b border-violet-100 bg-gradient-to-br from-violet-50 via-pink-50 to-sky-50 p-6">
          <AuthModalHeader
            Icon={LogIn}
            eyebrow="Masuk MyExam"
            onClose={onClose}
            text="Masuk untuk melanjutkan latihan atau mengelola ujianmu."
            title="Selamat datang kembali."
          />
        </div>

        <div className="bg-white p-6">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <AuthField
              label="Email"
              placeholder="nama@email.com"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <AuthField
              label="Password"
              placeholder="Minimal 6 karakter"
              type="password"
              value={password}
              onChange={setPassword}
            />

            {error ? <p className="text-sm text-danger">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="h-12 rounded-2xl bg-gradient-to-r from-pink-300 via-violet-300 to-sky-300 text-base font-black text-slate-800 shadow-lg shadow-violet-100 transition duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleOpenRegister}
            className="mt-5 w-full text-center text-sm font-bold text-violet-500 transition hover:text-violet-600"
          >
            Belum punya akun? Daftar
          </button>
        </div>
      </section>
    </div>
    {success ? <AuthTransitionOverlay action="login" /> : null}
    </>
  );
}
