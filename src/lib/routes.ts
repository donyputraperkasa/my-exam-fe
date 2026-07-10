export const appRoutes = {
  home: "/",
  trial: "/trial",
  auth: {
    login: "/login",
    register: "/register",
  },
  admin: {
    dashboard: "/admin",
    grades: "/admin/grades",
    subjects: "/admin/subjects",
    questions: "/admin/questions",
    packages: "/admin/packages",
    subscriptions: "/admin/subscriptions",
    lessPrivate: "/admin/lessPrivate",
  },
  student: {
    dashboard: "/student",
    trial: "/student/trial",
    packages: "/student/packages",
    recap: "/student/recap",
    subscription: "/student/subscription",
    discussion: "/student/discussion",
    lessPrivate: "/student/lessPrivate",
  },
};
