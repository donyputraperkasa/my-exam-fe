"use client";
import { FormEvent, useEffect, useState } from "react";
import { fetchGrades } from "@/features/admin/grades/grades-api";
import { fetchSubjects } from "@/features/admin/subjects/subjects-api";
import { PackageDetail } from "@/components/admin/packages/package-detail";
import { getToken } from "@/features/auth/session";
import type { ExamPackage, Grade, Subject } from "@/types/exam";
import { PackageForm } from "./package-form";
import { PackageList } from "./package-list";
import { emptyPackage, toPackageForm } from "./package-state";
import { createExamPackage, deleteExamPackage, fetchAdminPackage, fetchAdminPackages, updateExamPackage, type PackagePayload } from "./packages-api";
export function PackageManager() {
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<PackagePayload>(emptyPackage);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [packages, setPackages] = useState<ExamPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<ExamPackage | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  useEffect(() => { void loadData(); }, []);
  async function loadData() {
    const token = getToken();
    if (!token) return;
    try {
      const [gradeItems, subjectItems, packageItems] = await Promise.all([fetchGrades(), fetchSubjects(), fetchAdminPackages(token)]);
      setGrades(gradeItems);
      setSubjects(subjectItems);
      setPackages(packageItems.data);
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
      const saved = editingId ? await updateExamPackage(editingId, form, token) : await createExamPackage(form, token);
      resetForm();
      await loadData();
      setSelectedPackage(saved);
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }
  async function handleSelect(item: ExamPackage) {
    const token = getToken();
    if (!token) return;
    try {
      setSelectedPackage(await fetchAdminPackage(item.id, token));
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }
  async function handleEdit(item: ExamPackage) {
    const token = getToken();
    if (!token) return;
    const detail = await fetchAdminPackage(item.id, token);
    setSelectedPackage(detail);
    setEditingId(detail.id);
    setForm(toPackageForm(detail));
  }
  function handleBackToList() {
    setSelectedPackage(null);
  }
  async function handleDelete(id: string) {
    const token = getToken();
    if (!token || !window.confirm("Hapus paket ini?")) return;
    await deleteExamPackage(id, token);
    if (selectedPackage?.id === id) setSelectedPackage(null);
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
    <section>
      {selectedPackage ? (
        <PackageDetail item={selectedPackage} onBack={handleBackToList} />
      ) : (
        <div className="grid gap-5">
          <PackageForm
            editingId={editingId}
            error={error}
            form={form}
            grades={grades}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            subjects={subjects.filter((item) => item.gradeId === form.gradeId)}
          />
          <PackageList
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSelect={handleSelect}
            packages={packages}
            selectedId=""
          />
        </div>
      )}
    </section>
  );
}
function getMessage(error: unknown) { return error instanceof Error ? error.message : "Terjadi kesalahan"; }
function firstSubjectId(subjects: Subject[], gradeId = "") { return subjects.find((item) => item.gradeId === gradeId)?.id ?? ""; }
