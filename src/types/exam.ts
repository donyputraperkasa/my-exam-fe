export type AccessType = "FREE" | "PREMIUM";

export type Grade = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
  gradeId: string;
};

export type ExamPackage = {
  id: string;
  title: string;
  gradeId: string;
  subjectId: string;
  accessType: AccessType;
  durationMinutes: number | null;
};
