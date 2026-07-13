import { Search } from "lucide-react";

type FilterOption = { id: string; label: string };

type DiscussionVideoFiltersProps = {
  packages: FilterOption[];
  subjects: string[];
  query: string;
  packageId: string;
  subject: string;
  onQueryChange: (value: string) => void;
  onPackageChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
};

export function DiscussionVideoFilters(props: DiscussionVideoFiltersProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-border bg-white/88 p-4 shadow-sm lg:grid-cols-[1fr_15rem_15rem]">
      <label className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          value={props.query}
          onChange={(event) => props.onQueryChange(event.target.value)}
          placeholder="Cari soal atau judul paket..."
          className="h-12 w-full rounded-md border border-border bg-white pl-12 pr-4 text-sm font-bold outline-none focus:border-primary"
        />
      </label>
      <select value={props.packageId} onChange={(event) => props.onPackageChange(event.target.value)} className="h-12 rounded-md border border-border bg-white px-4 text-sm font-bold">
        <option value="">Semua paket</option>
        {props.packages.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
      <select value={props.subject} onChange={(event) => props.onSubjectChange(event.target.value)} className="h-12 rounded-md border border-border bg-white px-4 text-sm font-bold">
        <option value="">Semua mapel</option>
        {props.subjects.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  );
}
