"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchGrades } from "@/features/admin/grades/grades-api";
import { fetchSubjects } from "@/features/admin/subjects/subjects-api";
import { getToken } from "@/features/auth/session";
import type { ExamPackage, Grade, Question, Subject } from "@/types/exam";
import { fetchAdminQuestions } from "../questions/questions-api";
import {
  createExamPackage,
  deleteExamPackage,
  fetchAdminPackage,
  fetchAdminPackages,
  updateExamPackage,
  type PackagePayload,
} from "./packages-api";
import { PackageForm } from "./package-form";
import { PackageList } from "./package-list";

const emptyPackage: PackagePayload = {
  accessType: "PREMIUM",
  gradeId: "",
  isActive: true,
  questionIds: [],
  subjectId: "",
  title: "",
};

export function PackageManager() {
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<PackagePayload>(emptyPackage);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [packages, setPackages] = useState<ExamPackage[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    const token = getToken();
    if (!token) return;
    try {
      const [gradeItems, subjectItems, packageItems, questionItems] = await Promise.all([fetchGrades(), fetchSubjects(), fetchAdminPackages(token), fetchAdminQuestions({}, token)]);
      setGrades(gradeItems);
      setSubjects(subjectItems);
      setPackages(packageItems.data);
      setQuestions(questionItems.data);
      setForm({ ...emptyPackage, gradeId: gradeItems[0]?.id ?? "", subjectId: firstSubjectId(subjectItems, gradeItems[0]?.id) });
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getToken();
    if (!token) return setError("Sesi admin tidak ditemukan");
    try {
      if (editingId) await updateExamPackage(editingId, form, token);
      else await createExamPackage(form, token);
      resetForm();
      await loadData();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  async function handleEdit(item: ExamPackage) {
    const token = getToken();
    if (!token) return;
    const detail = await fetchAdminPackage(item.id, token);
    setEditingId(detail.id);
    setForm({
      accessType: detail.accessType,
      durationMinutes: detail.durationMinutes ?? undefined,
      gradeId: detail.gradeId,
      isActive: detail.isActive,
      questionIds: detail.questions?.map((entry) => entry.question.id) ?? [],
      subjectId: detail.subjectId,
      title: detail.title,
    });
  }

  async function handleDelete(id: string) {
    const token = getToken();
    if (!token || !window.confirm("Hapus paket ini?")) return;
    await deleteExamPackage(id, token);
    await loadData();
  }

  function resetForm() {
    setEditingId("");
    setForm({ ...emptyPackage, gradeId: grades[0]?.id ?? "", subjectId: firstSubjectId(subjects, grades[0]?.id) });
  }

  function handleFormChange(nextForm: PackagePayload) {
    if (nextForm.gradeId === form.gradeId) return setForm(nextForm);
    const subjectId = subjects.find((item) => item.gradeId === nextForm.gradeId)?.id ?? "";
    setForm({ ...nextForm, questionIds: [], subjectId });
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
      <PackageForm editingId={editingId} error={error} form={form} grades={grades} onChange={handleFormChange} onSubmit={handleSubmit} questions={questions} subjects={subjects.filter((item) => item.gradeId === form.gradeId)} />
      <PackageList onDelete={handleDelete} onEdit={handleEdit} packages={packages} />
    </section>
  );
}

function getMessage(error: unknown) { return error instanceof Error ? error.message : "Terjadi kesalahan"; }
function firstSubjectId(subjects: Subject[], gradeId = "") { return subjects.find((item) => item.gradeId === gradeId)?.id ?? ""; }
