import { Ban, CircleCheckBig } from "lucide-react";

type PublicTeacherExamStateProps = {
  blocked?: boolean;
  message: string;
};

export function PublicTeacherExamState({
  blocked = false,
  message,
}: PublicTeacherExamStateProps) {
  const Icon = blocked ? Ban : CircleCheckBig;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <section className="w-full max-w-xl rounded-3xl border border-violet-100 bg-white p-8 text-center shadow-sm">
        <Icon className={`mx-auto h-12 w-12 ${blocked ? "text-red-500" : "text-emerald-500"}`} />
        <p className="mt-4 text-sm font-black uppercase text-pink-400">
          {blocked ? "Ujian dihentikan" : "Ujian selesai"}
        </p>
        <h1 className="mt-3 text-3xl font-black">{message}</h1>
        {blocked ? (
          <p className="mt-4 text-sm font-bold leading-6 text-muted">
            Hubungi guru untuk mendapatkan tindak lanjut.
          </p>
        ) : null}
      </section>
    </main>
  );
}
