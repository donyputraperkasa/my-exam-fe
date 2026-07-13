"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Coins, Plus } from "lucide-react";
import { getToken } from "@/features/auth/session";
import { AdminDataTable, AdminTableCell } from "./admin-data-table";
import { AdminListSearch } from "./admin-list-search";
import { formatAdminDate } from "./subscription-admin-format";
import {
  fetchTeacherAccounts,
  grantTeacherCredit,
  type AdminTeacherAccount,
} from "./teacher-credit-admin-api";

const headers = ["Nama", "Jenis kredit", "Tanggal mulai", "Kadaluarsa", "Status", "Aksi"];

export function TeacherCreditManager() {
  const [teachers, setTeachers] = useState<AdminTeacherAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantingId, setGrantingId] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const filteredTeachers = useMemo(() => {
    const keyword = query.toLowerCase();
    return teachers.filter((teacher) =>
      `${teacher.name} ${teacher.email} kredit publish ${teacher.teacherCreditBalance}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [query, teachers]);

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
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><Coins className="h-5 w-5" /></span>
        <div><p className="text-sm font-black uppercase text-pink-400">Kredit guru</p><h2 className="mt-1 text-2xl font-black">Aktivasi publish manual</h2></div>
      </div>
      <AdminListSearch value={query} onChange={setQuery} placeholder="Cari nama, email, atau saldo kredit..." />
      {error ? <p className="mt-4 text-sm font-bold text-red-500">{error}</p> : null}
      {loading ? <p className="mt-5 text-sm font-bold text-muted">Memuat akun guru...</p> : null}
      {!loading ? (
        <AdminDataTable headers={headers} empty={!filteredTeachers.length} emptyMessage="Akun guru tidak ditemukan." minWidth="min-w-[1050px]">
          {filteredTeachers.map((teacher) => <TeacherRow key={teacher.id} teacher={teacher} granting={grantingId === teacher.id} onGrant={() => void grant(teacher.id)} />)}
        </AdminDataTable>
      ) : null}
    </section>
  );
}

type TeacherRowProps = {
  granting: boolean;
  onGrant: () => void;
  teacher: AdminTeacherAccount;
};

function TeacherRow({ teacher, granting, onGrant }: TeacherRowProps) {
  const available = teacher.teacherCreditBalance > 0;
  return (
    <tr className="font-bold transition hover:bg-violet-50/35">
      <AdminTableCell><p className="font-black">{teacher.name}</p><p className="mt-1 text-xs text-muted">{teacher.email}</p></AdminTableCell>
      <AdminTableCell>Kredit Publish Guru</AdminTableCell>
      <AdminTableCell>{formatAdminDate(teacher.latestTeacherCreditAt)}</AdminTableCell>
      <AdminTableCell>Tidak kedaluwarsa</AdminTableCell>
      <AdminTableCell><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{available ? `${teacher.teacherCreditBalance} kredit tersedia` : "Habis"}</span></AdminTableCell>
      <AdminTableCell><button type="button" disabled={granting} onClick={onGrant} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-black disabled:opacity-50"><Plus className="h-4 w-4" /> Tambah 1</button></AdminTableCell>
    </tr>
  );
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Gagal mengatur kredit guru";
}
