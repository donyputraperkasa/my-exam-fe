"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { QuestionFormModal } from "@/components/admin/questions/question-form-modal";
import { QuestionPackageCards } from "@/components/admin/questions/question-package-cards";
import { QuestionToolbar } from "@/components/admin/questions/question-toolbar";
import { fetchGrades } from "@/features/admin/grades/grades-api";
import { fetchSubjects } from "@/features/admin/subjects/subjects-api";
import { getToken } from "@/features/auth/session";
import type { ExamPackage, Grade, Question, Subject } from "@/types/exam";
import { fetchAdminPackages } from "../packages/packages-api";
import { filterQuestions } from "./question-filters";
import { QuestionPanel } from "./question-panel";
import {
  createEmptyQuestionForm,
  mapFormToPayload,
  mapQuestionToForm,
  type QuestionFormState,
} from "./question-state";
import {
  createQuestion,
  deleteQuestion,
  fetchAdminQuestions,
  updateQuestion,
  uploadExplanationImage,
} from "./questions-api";
export function QuestionManager() {
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [filterGradeId, setFilterGradeId] = useState("");
  const [filterSubjectId, setFilterSubjectId] = useState("");
  const [form, setForm] = useState<QuestionFormState>(createEmptyQuestionForm());
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [packages, setPackages] = useState<ExamPackage[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  useEffect(() => {
    void loadMasterData();
  }, []);
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    void fetchAdminQuestions(
      { gradeId: filterGradeId, subjectId: filterSubjectId },
      token,
    )
      .then((response) => setQuestions(response.data))
      .catch((caughtError) => setError(getMessage(caughtError)))
      .finally(() => setLoading(false));
  }, [filterGradeId, filterSubjectId]);
  const filteredQuestions = useMemo(
    () => filterQuestions(questions, selectedPackageId, searchQuery),
    [questions, searchQuery, selectedPackageId],
  );
  async function loadMasterData() {
    const token = getToken();
    if (!token) return;
    try {
      const [gradeItems, subjectItems, packageItems] = await Promise.all([
        fetchGrades(),
        fetchSubjects(),
        fetchAdminPackages(token),
      ]);
      setGrades(gradeItems);
      setSubjects(subjectItems);
      setPackages(packageItems.data);
      setForm(
        createEmptyQuestionForm(
          gradeItems[0]?.id,
          firstSubjectId(subjectItems, gradeItems[0]?.id),
        ),
      );
    } catch (caughtError) {
      setError(getMessage(caughtError));
    }
  }
  async function refreshQuestions() {
    const token = getToken();
    if (token)
      setQuestions(
        (
          await fetchAdminQuestions(
            { gradeId: filterGradeId, subjectId: filterSubjectId },
            token,
          )
        ).data,
      );
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
      setIsFormOpen(false);
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
    setForm(
      createEmptyQuestionForm(
        grades[0]?.id,
        firstSubjectId(subjects, grades[0]?.id),
      ),
    );
  }
  function handleEdit(question: Question) {
    setEditingId(question.id);
    setForm(mapQuestionToForm(question));
    setIsFormOpen(true);
  }
  function handleCreateQuestion() {
    resetForm();
    setError("");
    setIsFormOpen(true);
  }
  function handleCloseForm() {
    resetForm();
    setError("");
    setIsFormOpen(false);
  }
  function handleFormChange(nextForm: QuestionFormState) {
    if (nextForm.gradeId === form.gradeId) return setForm(nextForm);
    const subjectId =
      subjects.find((item) => item.gradeId === nextForm.gradeId)?.id ?? "";
    setForm({ ...nextForm, packageIds: [], subjectId });
  }
  async function handleImageUpload(file: File) {
    const token = getToken();
    if (!token) throw new Error("Sesi admin tidak ditemukan");
    return (await uploadExplanationImage(file, token)).url;
  }
  return (
    <section className="grid w-full grid-cols-1 gap-5">
      <QuestionToolbar
        onCreate={handleCreateQuestion}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />
      <QuestionPackageCards
        onSelect={setSelectedPackageId}
        packages={packages}
        questions={questions}
        selectedId={selectedPackageId}
      />
      <QuestionPanel
        filterGradeId={filterGradeId}
        filterSubjectId={filterSubjectId}
        grades={grades}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onFilterGrade={setFilterGradeId}
        onFilterSubject={setFilterSubjectId}
        questions={filteredQuestions}
        subjects={subjects}
      />
      {isFormOpen ? (
        <QuestionFormModal
          editingId={editingId}
          error={error}
          form={form}
          grades={grades}
          onChange={handleFormChange}
          onClose={handleCloseForm}
          onImageUpload={handleImageUpload}
          onSubmit={handleSubmit}
          packages={packages}
          subjects={subjects}
        />
      ) : null}
    </section>
  );
}
function getMessage(error: unknown) { return error instanceof Error ? error.message : "Terjadi kesalahan"; }
function firstSubjectId(subjects: Subject[], gradeId = "") {
  return subjects.find((item) => item.gradeId === gradeId)?.id ?? "";
}
