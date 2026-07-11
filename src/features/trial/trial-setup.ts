import { getDashboardPath } from "@/features/auth/redirect";
import { getSelectedGrade, getUser } from "@/features/auth/session";
import { appRoutes } from "@/lib/routes";
import { getTrialQuestionsByGrade } from "./trial-data";

export function getTrialSetup() {
  const user = getUser();

  if (!user) {
    return {
      backHref: appRoutes.home,
      backLabel: "Kembali ke beranda",
      isAuthenticated: false,
      questions: getTrialQuestionsByGrade(null),
    };
  }

  return {
    backHref: getDashboardPath(user.role),
    backLabel: "Kembali ke dashboard",
    isAuthenticated: true,
    questions: getTrialQuestionsByGrade(getSelectedGrade()),
  };
}
