export type AccessType = "FREE" | "PREMIUM";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type Grade = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
  gradeId: string;
  grade?: Grade;
};

export type ExamPackage = {
  id: string;
  title: string;
  gradeId: string;
  subjectId: string;
  grade?: Grade;
  subject?: Subject;
  accessType: AccessType;
  durationMinutes: number | null;
  isActive: boolean;
  _count?: { questions: number; attempts: number };
  questions?: Array<{ order?: number; question: Question }>;
};

export type QuestionOption = {
  id?: string;
  label: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  gradeId: string;
  subjectId: string;
  grade?: Grade;
  subject?: Subject;
  question: string;
  explanation?: string | null;
  explanationImageUrl?: string | null;
  explanationVideoUrl?: string | null;
  difficulty: Difficulty;
  isActive: boolean;
  isPublicPreview: boolean;
  options: QuestionOption[];
  packages?: Array<{
    packageId: string;
    package?: Pick<ExamPackage, "id" | "title" | "accessType" | "isActive">;
  }>;
};

export type PaginatedResponse<TData> = {
  data: TData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
