"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { getToken } from "@/features/auth/session";
import type { Grade } from "@/types/exam";
import { createGrade, deleteGrade, fetchGrades, updateGrade } from "./grades-api";

export function GradeManager() {
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    void loadGrades();
  }, []);

  async function loadGrades() {
    setLoading(true);
    setError("");
    try {
      setGrades(await fetchGrades());
    } catch (caughtError) {
      setError(getMessage(caughtError));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getToken();
    if (!token) return setError("Sesi admin tidak ditemukan");

    try {
      setError("");
      if (editingId) {
        await updateGrade(editingId, { name }, token);
      } else {
        await createGrade({ name }, token);
      }
      setEditingId("");
      setName("");
      await loadGrades();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  async function handleDelete(id: string) {
    const token = getToken();
    if (!token || !window.confirm("Hapus jenjang ini?")) return;

    try {
      await deleteGrade(id, token);
      await loadGrades();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
        <p className="text-sm font-black uppercase text-secondary">
          {editingId ? "Edit Jenjang" : "Tambah Jenjang"}
        </p>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Nama jenjang
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-md border border-border px-3 outline-none focus:border-primary"
            placeholder="Contoh: SD"
            required
          />
        </label>
        {error ? <p className="mt-3 text-sm font-bold text-danger">{error}</p> : null}
        <div className="mt-5 flex gap-2">
          <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-black">
            <Plus className="h-4 w-4" />
            {editingId ? "Simpan" : "Tambah"}
          </button>
          {editingId ? (
            <button type="button" onClick={() => { setEditingId(""); setName(""); }} className="rounded-md border border-border px-4">
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </form>

      <div className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
        <p className="text-sm font-black uppercase text-secondary">Daftar Jenjang</p>
        <div className="mt-4 grid gap-3">
          {loading ? <p className="text-sm text-muted">Memuat jenjang...</p> : null}
          {grades.map((grade) => (
            <div key={grade.id} className="flex items-center justify-between gap-3 rounded-lg bg-background/80 p-4">
              <p className="font-black">{grade.name}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setEditingId(grade.id); setName(grade.name); }} className="rounded-md border border-border p-2">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => void handleDelete(grade.id)} className="rounded-md border border-border p-2 text-danger">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}
