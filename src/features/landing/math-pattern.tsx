import {
  BookOpenCheck,
  Calculator,
  Sigma,
  SquarePi,
  SquareRadical,
  Trophy,
} from "lucide-react";

const icons = [
  { Icon: Calculator, className: "left-[6%] top-10 rotate-[-10deg]" },
  { Icon: Sigma, className: "right-[10%] top-14 rotate-12" },
  { Icon: SquarePi, className: "left-[18%] bottom-8 rotate-6" },
  { Icon: SquareRadical, className: "right-[22%] bottom-12 rotate-[-8deg]" },
  { Icon: BookOpenCheck, className: "left-[48%] top-20 rotate-3" },
  { Icon: Trophy, className: "right-[42%] bottom-6 rotate-[-5deg]" },
];

export function MathPattern() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.09),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(245,158,11,0.11),transparent_24%)]" />
      {icons.map(({ Icon, className }) => (
        <Icon
          key={className}
          className={`absolute h-20 w-20 text-secondary/10 ${className}`}
          strokeWidth={1.6}
        />
      ))}
    </div>
  );
}
