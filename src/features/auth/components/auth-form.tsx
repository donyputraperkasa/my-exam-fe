"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { login, register } from "../api";
import { getDashboardPath } from "../redirect";
import { getToken, getUser, saveSession } from "../session";
import { AuthField } from "./auth-field";
import { AuthSwitch } from "./auth-switch";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isRegister = mode === "register";

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (token && user) {
      router.replace(getDashboardPath(user.role));
    }
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = isRegister
        ? await register({ name, email, password })
        : await login({ email, password });
      saveSession(session);
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
    <main className="min-h-screen bg-[#f4f7fb] px-6 py-10">
      <section className="mx-auto flex w-full max-w-md flex-col gap-6">
        <Link href={appRoutes.home} className="text-sm font-bold text-secondary">
          Kembali ke beranda
        </Link>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-surface p-6 shadow-sm"
        >
          <h1 className="text-2xl font-extrabold text-foreground">
            {isRegister ? "Daftar siswa" : "Masuk"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {isRegister
              ? "Buat akun siswa untuk mulai latihan."
              : "Masuk untuk melanjutkan latihan."}
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {isRegister ? (
              <AuthField label="Nama" value={name} onChange={setName} />
            ) : null}
            <AuthField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <AuthField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>

          {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-11 w-full rounded-md bg-primary px-4 text-sm font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : isRegister ? "Daftar" : "Masuk"}
          </button>
          <AuthSwitch mode={mode} />
        </form>
      </section>
    </main>
  );
}
