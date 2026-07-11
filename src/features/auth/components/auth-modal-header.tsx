import { X, type LucideIcon } from "lucide-react";

type AuthModalHeaderProps = {
  Icon: LucideIcon;
  eyebrow: string;
  onClose: () => void;
  text: string;
  title: string;
};

export function AuthModalHeader({
  Icon,
  eyebrow,
  onClose,
  text,
  title,
}: AuthModalHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-pink-200 via-violet-200 to-sky-200 text-violet-700">
          <Icon className="h-5 w-5" />
        </span>
        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-pink-500">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full border border-violet-100 bg-white/80 p-2 text-slate-500 transition hover:bg-violet-100 hover:text-violet-700"
        aria-label="Tutup modal"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
