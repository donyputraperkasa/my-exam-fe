export type UserRole = "ADMIN" | "STUDENT" | "TEACHER";
export type StudentGrade = "SD" | "SMP" | "SMA" | "SMK";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gradeId: string | null;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};
