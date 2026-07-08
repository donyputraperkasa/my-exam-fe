import { BookOpenCheck, Clock, Target } from "lucide-react";
import { stepItems } from "./content";
import { MathPattern } from "./math-pattern";

const stepIcons = [Target, Clock, BookOpenCheck];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface px-6 py-12">
      <MathPattern />
      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Alur Belajar
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Sedikit demi sedikit, skor ikut naik.
          </h2>
        </div>
        <div className="grid gap-3">
          {stepItems.map((item, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={item} className="flex gap-4 rounded-lg bg-[#f8fafc] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <Icon className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-sm leading-6 text-muted">{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
