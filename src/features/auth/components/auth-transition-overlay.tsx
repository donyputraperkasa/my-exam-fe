import { CheckCircle2, LogOut } from "lucide-react";

export type AuthTransition = "login" | "register" | "logout";

const content: Record<AuthTransition, { title: string; text: string }> = {
  login: {
    title: "Berhasil masuk",
    text: "Menyiapkan dashboard untukmu...",
  },
  register: {
    title: "Akun berhasil dibuat",
    text: "Menyiapkan ruang belajar MyExam...",
  },
  logout: {
    title: "Sampai jumpa",
    text: "Mengakhiri sesi dan kembali ke beranda...",
  },
};

export function AuthTransitionOverlay({ action }: { action: AuthTransition }) {
  const Icon = action === "logout" ? LogOut : CheckCircle2;
  const message = content[action];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-violet-950/35 px-5 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-sm rounded-2xl border border-violet-100 bg-white p-7 text-center text-[#2f2250] shadow-2xl shadow-violet-950/20">
        <span className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-violet-100 text-violet-700">
          <Icon className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-black">{message.title}</h2>
        <p className="mt-2 text-sm font-semibold text-[#75698d]">
          {message.text}
        </p>
        <div className="mx-auto mt-5 h-1.5 w-24 overflow-hidden rounded-full bg-violet-100">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-violet-600" />
        </div>
      </div>
    </div>
  );
}

export function waitForAuthTransition(duration = 850) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}
