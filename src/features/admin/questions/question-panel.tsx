import type { Grade, Question, Subject } from "@/types/exam";
import { QuestionList } from "./question-list";

type QuestionPanelProps = {
  filterGradeId: string;
  filterSubjectId: string;
  grades: Grade[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (item: Question) => void;
  onFilterGrade: (value: string) => void;
  onFilterSubject: (value: string) => void;
  questions: Question[];
  subjects: Subject[];
};

export function QuestionPanel(props: QuestionPanelProps) {
  const subjects = props.filterGradeId
    ? props.subjects.filter((subject) => subject.gradeId === props.filterGradeId)
    : props.subjects;

  return (
    <div className="rounded-lg border border-border bg-white/88 p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-black uppercase text-secondary">Bank Soal</p>
        <div className="flex gap-2">
          <select value={props.filterGradeId} onChange={(event) => props.onFilterGrade(event.target.value)} className="h-10 rounded-md border border-border px-3 text-sm font-bold">
            <option value="">Semua jenjang</option>
            {props.grades.map((grade) => <option key={grade.id} value={grade.id}>{grade.name}</option>)}
          </select>
          <select value={props.filterSubjectId} onChange={(event) => props.onFilterSubject(event.target.value)} className="h-10 rounded-md border border-border px-3 text-sm font-bold">
            <option value="">Semua mapel</option>
            {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
          </select>
        </div>
      </div>
      <QuestionList
        loading={props.loading}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
        questions={props.questions}
      />
    </div>
  );
}
