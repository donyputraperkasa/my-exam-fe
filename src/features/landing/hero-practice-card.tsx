const answerOptions = [
  { label: "A", value: "86", active: false },
  { label: "B", value: "96", active: true },
  { label: "C", value: "108", active: false },
];

export function HeroPracticeCard() {
  return (
    <aside className="rounded-lg border border-white/35 bg-white/95 p-5 text-foreground shadow-2xl shadow-foreground/25 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-secondary">Mini Tryout</p>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-foreground">
          8 menit
        </span>
      </div>
      <h2 className="mt-4 text-2xl font-bold">Hasil dari 12 x 8 adalah...</h2>
      <div className="mt-5 grid gap-2">
        {answerOptions.map((option) => (
          <div
            key={option.label}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              option.active
                ? "border-secondary bg-secondary/10"
                : "border-border bg-background"
            }`}
          >
            <span className="text-sm font-semibold">{option.label}</span>
            <span className="text-sm font-bold">{option.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg bg-primary/8 p-4">
        <p className="text-sm font-bold text-primary">Pembahasan singkat</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          12 x 8 = 96. Cek cara cepatnya setelah submit.
        </p>
      </div>
    </aside>
  );
}
