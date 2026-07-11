type AuthMode = "login" | "register";

type AuthSwitchProps = {
  mode: AuthMode;
  onSwitch: () => void;
};

export function AuthSwitch({ mode, onSwitch }: AuthSwitchProps) {
  const isRegister = mode === "register";

  return (
    <button
      type="button"
      onClick={onSwitch}
      className="mt-5 w-full text-center text-sm font-bold text-violet-500 transition hover:text-violet-600 hover:underline"
    >
      {isRegister
        ? "Sudah punya akun? Masuk"
        : "Belum punya akun? Daftar gratis"}
    </button>
  );
}
