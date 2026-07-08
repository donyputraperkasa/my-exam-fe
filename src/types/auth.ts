export type UserRole = "ADMIN" | "STUDENT";

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
