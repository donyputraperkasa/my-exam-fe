type HeroActionsProps = {
  onOpenPackages: () => void;
  onStartTrial: () => void;
};

export function HeroActions({
  onOpenPackages,
  onStartTrial,
}: HeroActionsProps) {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onStartTrial}
        className="rounded-md bg-accent px-5 py-3 text-center text-sm font-bold text-foreground transition hover:bg-amber-400"
      >
        Coba 10 Soal Gratis
      </button>
      <button
        type="button"
        onClick={onOpenPackages}
        className="rounded-md border border-white/60 px-5 py-3 text-center text-sm font-bold transition hover:bg-white/10"
      >
        Lihat Paket
      </button>
    </div>
  );
}
