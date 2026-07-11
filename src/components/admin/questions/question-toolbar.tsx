import { Plus, Search } from "lucide-react";

type QuestionToolbarProps = {
  onCreate: () => void;
  onSearch: (value: string) => void;
  searchQuery: string;
};

export function QuestionToolbar({
  onCreate,
  onSearch,
  searchQuery,
}: QuestionToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/88 p-4 shadow-sm sm:flex-row sm:items-center">
      <label className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Cari soal, jenjang, mapel, atau pembahasan..."
          className="h-12 w-full rounded-xl border border-border bg-background/70 pl-12 pr-4 text-sm font-bold outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
        />
      </label>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <Plus className="h-5 w-5" />
        Buat Soal
      </button>
    </div>
  );
}
