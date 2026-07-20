import { Ban, CircleCheckBig, RotateCcw } from "lucide-react";

type PublicTeacherExamStateProps = {
  blocked?: boolean;
  message: string;
  onAction?: () => void;
  actionPending?: boolean;
};

export function PublicTeacherExamState({
  blocked = false,
  message,
  onAction,
  actionPending = false,
}: PublicTeacherExamStateProps) {
  const Icon = blocked ? Ban : CircleCheckBig;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-5">
      <section className="w-full max-w-xl rounded-2xl border border-violet-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <Icon className={`mx-auto h-12 w-12 ${blocked ? "text-red-500" : "text-emerald-500"}`} />
        <p className="mt-4 text-sm font-black uppercase text-pink-400">
          {blocked ? "Ujian dihentikan" : "Ujian selesai"}
        </p>
        <h1 className="mt-3 text-3xl font-black">{message}</h1>
        {blocked ? (
          <>
            <p className="mt-4 text-sm font-bold leading-6 text-muted">
              Hubungi guru. Setelah guru menekan &quot;Izinkan lanjut&quot;, periksa kembali akses ujianmu.
            </p>
            {onAction ? (
              <button type="button" disabled={actionPending} onClick={onAction} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-black disabled:opacity-60">
                <RotateCcw className="h-4 w-4" />
                {actionPending ? "Memeriksa..." : "Periksa dan Lanjutkan"}
              </button>
            ) : null}
          </>
        ) : null}
      </section>
    </main>
  );
}
