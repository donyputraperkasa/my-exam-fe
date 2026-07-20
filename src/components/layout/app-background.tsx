import { Calculator, Sigma, SquarePi } from "lucide-react";

export function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(124,58,237,0.10),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(109,40,217,0.07),transparent_28%),radial-gradient(circle_at_50%_95%,rgba(139,92,246,0.09),transparent_34%)]" />
      <Calculator className="absolute left-8 top-28 h-24 w-24 rotate-[-10deg] text-primary/10" />
      <Sigma className="absolute right-12 top-44 h-28 w-28 rotate-12 text-primary/8" />
      <SquarePi className="absolute bottom-10 left-1/4 h-24 w-24 rotate-6 text-primary/10" />
    </div>
  );
}
