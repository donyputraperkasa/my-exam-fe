"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchGrades } from "@/features/admin/grades/grades-api";
import { fetchSubjects } from "@/features/admin/subjects/subjects-api";
import { getToken } from "@/features/auth/session";
import type { ExamPackage, Grade, Question, Subject } from "@/types/exam";
import { fetchAdminPackages } from "../packages/packages-api";
import { QuestionForm } from "./question-form";
import { QuestionPanel } from "./question-panel";
import { createEmptyQuestionForm, mapFormToPayload, mapQuestionToForm, type QuestionFormState } from "./question-state";
import { createQuestion, deleteQuestion, fetchAdminQuestions, updateQuestion, uploadExplanationImage } from "./questions-api";

export function QuestionManager() {
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [filterGradeId, setFilterGradeId] = useState("");
  const [filterSubjectId, setFilterSubjectId] = useState("");
  const [form, setForm] = useState<QuestionFormState>(createEmptyQuestionForm());
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<ExamPackage[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    void loadMasterData();
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    void fetchAdminQuestions({ gradeId: filterGradeId, subjectId: filterSubjectId }, token)
      .then((response) => setQuestions(response.data))
      .catch((caughtError) => setError(getMessage(caughtError)))
      .finally(() => setLoading(false));
  }, [filterGradeId, filterSubjectId]);

  async function loadMasterData() {
    const token = getToken();
    if (!token) return;
    try {
      const [gradeItems, subjectItems, packageItems] = await Promise.all([fetchGrades(), fetchSubjects(), fetchAdminPackages(token)]);
      setGrades(gradeItems);
      setSubjects(subjectItems);
      setPackages(packageItems.data);
      setForm(createEmptyQuestionForm(gradeItems[0]?.id, firstSubjectId(subjectItems, gradeItems[0]?.id)));
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  async function refreshQuestions() {
    const token = getToken();
    if (!token) return;
    const response = await fetchAdminQuestions({ gradeId: filterGradeId, subjectId: filterSubjectId }, token);
    setQuestions(response.data);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getToken();
    if (!token) return setError("Sesi admin tidak ditemukan");

    try {
      setError("");
      const payload = mapFormToPayload(form);
      if (editingId) await updateQuestion(editingId, payload, token);
      else await createQuestion(payload, token);
      resetForm();
      await refreshQuestions();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  async function handleDelete(id: string) {
    const token = getToken();
    if (!token || !window.confirm("Hapus soal ini?")) return;
    try {
      await deleteQuestion(id, token);
      await refreshQuestions();
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }

  function resetForm() {
    setEditingId("");
    setForm(createEmptyQuestionForm(grades[0]?.id, firstSubjectId(subjects, grades[0]?.id)));
  }

  function handleEdit(question: Question) {
    setEditingId(question.id);
    setForm(mapQuestionToForm(question));
  }

  function handleFormChange(nextForm: QuestionFormState) {
    if (nextForm.gradeId === form.gradeId) return setForm(nextForm);
    const subjectId = subjects.find((item) => item.gradeId === nextForm.gradeId)?.id ?? "";
    setForm({ ...nextForm, packageIds: [], subjectId });
  }

  async function handleImageUpload(file: File) {
    const token = getToken();
    if (!token) throw new Error("Sesi admin tidak ditemukan");
    const response = await uploadExplanationImage(file, token);
    return response.url;
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[440px_minmax(0,1fr)]">
      <QuestionForm editingId={editingId} error={error} form={form} grades={grades} onCancel={resetForm} onChange={handleFormChange} onImageUpload={handleImageUpload} onSubmit={handleSubmit} packages={packages} subjects={subjects.filter((item) => item.gradeId === form.gradeId)} />
      <QuestionPanel filterGradeId={filterGradeId} filterSubjectId={filterSubjectId} grades={grades} loading={loading} onDelete={handleDelete} onEdit={handleEdit} onFilterGrade={setFilterGradeId} onFilterSubject={setFilterSubjectId} questions={questions} subjects={subjects} />
    </section>
  );
}
function getMessage(error: unknown) { return error instanceof Error ? error.message : "Terjadi kesalahan"; }
function firstSubjectId(subjects: Subject[], gradeId = "") { return subjects.find((item) => item.gradeId === gradeId)?.id ?? ""; }
