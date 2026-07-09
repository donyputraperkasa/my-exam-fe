const answerOptions = [
  { label: "A", value: "86", active: false },
  { label: "B", value: "96", active: true },
  { label: "C", value: "108", active: false },
  { label: "D", value: "116", active: false },
];

export function HeroPracticeCard() {
  return (
    <aside className="w-full max-w-3xl rounded-[2rem] border border-white/35 bg-white/95 p-8 text-foreground shadow-2xl shadow-foreground/20 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black uppercase tracking-wide text-secondary">
          Soal 1 dari 10
        </p>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-foreground">
          8 menit
        </span>
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-background px-6 py-8 text-center">
        <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
          12 × 8 = ...
        </h2>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {answerOptions.map((option) => (
          <div
            key={option.label}
            className={`flex items-center rounded-2xl border px-6 py-5 transition-all ${
              option.active
                ? "border-secondary bg-secondary/10 shadow-md"
                : "border-border bg-white hover:border-primary/40 hover:shadow-sm"
            }`}
          >
            <p className="text-xl font-black text-foreground">
              {option.label}. {option.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-primary/10 p-6">
        <p className="text-sm font-bold text-primary">Pembahasan singkat</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          12 x 8 = 96. Cek cara cepatnya setelah submit.
        </p>
      </div>
    </aside>
  );
}
