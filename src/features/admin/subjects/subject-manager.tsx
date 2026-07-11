"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchGrades } from "@/features/admin/grades/grades-api";
import { getToken } from "@/features/auth/session";
import type { Grade, Subject } from "@/types/exam";
import { createSubject, deleteSubject, fetchSubjects, updateSubject } from "./subjects-api";
import { SubjectForm } from "./subject-form";
import { SubjectPanel } from "./subject-panel";

export function SubjectManager() {
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [filterGradeId, setFilterGradeId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    void fetchGrades()
      .then((items) => {
        setGrades(items);
        setGradeId(items[0]?.id ?? "");
      })
      .catch((caughtError) => setError(getMessage(caughtError)));
  }, []);

  useEffect(() => {
    async function loadFilteredSubjects() {
      setLoading(true);
      try {
        setSubjects(await fetchSubjects(filterGradeId || undefined));
      } catch (caughtError) {
        setError(getMessage(caughtError));
      } finally {
        setLoading(false);
      }
    }

    void loadFilteredSubjects();
  }, [filterGradeId]);

  async function refreshSubjects(selectedGradeId = filterGradeId) {
    setLoading(true);
    try {
      setSubjects(await fetchSubjects(selectedGradeId || undefined));
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
      const payload = { gradeId, name };
      if (editingId) await updateSubject(editingId, payload, token);
      else await createSubject(payload, token);
      resetForm();
      await refreshSubjects();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  async function handleDelete(id: string) {
    const token = getToken();
    if (!token || !window.confirm("Hapus mapel ini?")) return;

    try {
      await deleteSubject(id, token);
      await refreshSubjects();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  function resetForm() {
    setEditingId("");
    setName("");
    setGradeId(grades[0]?.id ?? "");
  }

  function handleEdit(item: Subject) {
    setEditingId(item.id);
    setName(item.name);
    setGradeId(item.gradeId);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
      <SubjectForm
        editingId={editingId} error={error} gradeId={gradeId} grades={grades}
        name={name} onCancel={resetForm} onGradeChange={setGradeId}
        onNameChange={setName} onSubmit={handleSubmit}
      />

      <SubjectPanel
        filterGradeId={filterGradeId} grades={grades} loading={loading}
        onDelete={handleDelete} onEdit={handleEdit}
        onFilterChange={setFilterGradeId} subjects={subjects}
      />
    </section>
  );
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}
