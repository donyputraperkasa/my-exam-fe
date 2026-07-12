"use client";

import { useState } from "react";
import type {
  CreateTeacherQuestionPayload,
  TeacherExamStatus,
  TeacherQuestion,
} from "./api";
import { filterTeacherQuestions } from "./filter-teacher-questions";
import { TeacherExamToolbar } from "./teacher-exam-toolbar";
import { TeacherQuestionList } from "./teacher-question-list";
import { TeacherQuestionModal } from "./teacher-question-modal";

type TeacherQuestionWorkspaceProps = {
  addQuestion: (payload: CreateTeacherQuestionPayload) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  participantCount: number;
  questions: TeacherQuestion[];
  saving: boolean;
  status: TeacherExamStatus;
  updateQuestion: (id: string, payload: CreateTeacherQuestionPayload) => Promise<void>;
};

export function TeacherQuestionWorkspace(props: TeacherQuestionWorkspaceProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<TeacherQuestion>();
  const editable =
    props.status === "DRAFT" ||
    (props.status === "PUBLISHED" && props.participantCount === 0);

  async function save(payload: CreateTeacherQuestionPayload) {
    if (selected) await props.updateQuestion(selected.id, payload);
    else await props.addQuestion(payload);
  }

  function close() {
    setOpen(false);
    setSelected(undefined);
  }

  function remove(id: string) {
    if (window.confirm("Hapus soal ini?")) void props.deleteQuestion(id);
  }

  return (
    <>
      <TeacherExamToolbar
        canCreate={editable}
        query={query}
        onSearch={setQuery}
        onCreate={() => setOpen(true)}
      />
      <TeacherQuestionList
        editable={editable}
        onDelete={remove}
        onEdit={(question) => {
          setSelected(question);
          setOpen(true);
        }}
        questions={filterTeacherQuestions(props.questions, query)}
      />
      <TeacherQuestionModal
        onClose={close}
        onCreate={save}
        open={open}
        question={selected}
        saving={props.saving}
      />
    </>
  );
}
