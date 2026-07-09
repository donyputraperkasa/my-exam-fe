import Link from "next/link";
import { appRoutes } from "@/lib/routes";

type AuthMode = "login" | "register";

export function AuthSwitch({ mode }: { mode: AuthMode }) {
  const isRegister = mode === "register";

  return (
    <p className="mt-4 text-center text-sm text-muted">
      {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
      <Link
        href={isRegister ? appRoutes.auth.login : appRoutes.auth.register}
        className="font-semibold text-secondary"
      >
        {isRegister ? "Masuk" : "Daftar"}
      </Link>
    </p>
  );
}
