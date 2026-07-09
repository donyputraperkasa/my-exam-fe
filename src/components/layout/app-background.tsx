import { Calculator, Sigma, SquarePi } from "lucide-react";

export function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(124,58,237,0.13),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(255,107,107,0.13),transparent_26%),radial-gradient(circle_at_50%_95%,rgba(251,191,36,0.18),transparent_32%)]" />
      <Calculator className="absolute left-8 top-28 h-24 w-24 rotate-[-10deg] text-primary/10" />
      <Sigma className="absolute right-12 top-44 h-28 w-28 rotate-12 text-secondary/10" />
      <SquarePi className="absolute bottom-10 left-1/4 h-24 w-24 rotate-6 text-accent/20" />
    </div>
  );
}
