"use client";

import { useCallback, useEffect, useState } from "react";
import { Coins, Plus } from "lucide-react";
import { getToken } from "@/features/auth/session";
import {
  fetchTeacherAccounts,
  grantTeacherCredit,
  type AdminTeacherAccount,
} from "./teacher-credit-admin-api";

export function TeacherCreditManager() {
  const [teachers, setTeachers] = useState<AdminTeacherAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantingId, setGrantingId] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      setTeachers((await fetchTeacherAccounts(token)).data);
    } catch (caughtError) {
      setError(getMessage(caughtError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchTeacherAccounts(token)
      .then((response) => setTeachers(response.data))
      .catch((caughtError) => setError(getMessage(caughtError)))
      .finally(() => setLoading(false));
  }, []);

  async function grant(teacherId: string) {
    const token = getToken();
    if (!token) return;
    setGrantingId(teacherId);
    setError("");
    try {
      await grantTeacherCredit(teacherId, token);
      await load();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    } finally {
      setGrantingId("");
    }
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Coins className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-black uppercase text-pink-400">Kredit guru</p>
          <h2 className="mt-1 text-2xl font-black">Aktivasi publish manual</h2>
        </div>
      </div>
      {error ? <p className="mt-4 text-sm font-bold text-red-500">{error}</p> : null}
      <div className="mt-5 grid gap-3">
        {loading ? <p className="text-sm font-bold text-muted">Memuat akun guru...</p> : null}
        {!loading && !teachers.length ? (
          <p className="rounded-xl bg-background/70 p-4 text-sm font-bold text-muted">Belum ada akun guru.</p>
        ) : null}
        {teachers.map((teacher) => (
          <article key={teacher.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-background/70 p-4">
            <div>
              <p className="font-black">{teacher.name}</p>
              <p className="mt-1 text-xs font-bold text-muted">{teacher.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-violet-50 px-3 py-2 text-sm font-black text-violet-600">
                {teacher.teacherCreditBalance} kredit
              </span>
              <button type="button" disabled={grantingId === teacher.id} onClick={() => void grant(teacher.id)} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-black disabled:opacity-50">
                <Plus className="h-4 w-4" /> Tambah 1
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Gagal mengatur kredit guru";
}
