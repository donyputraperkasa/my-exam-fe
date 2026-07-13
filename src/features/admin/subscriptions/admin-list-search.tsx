import { Search } from "lucide-react";

type AdminListSearchProps = {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

export function AdminListSearch(props: AdminListSearchProps) {
  return (
    <label className="mt-5 flex h-12 items-center gap-3 rounded-xl border border-violet-100 bg-white px-4 text-muted">
      <Search className="h-4 w-4" />
      <input
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        className="w-full bg-transparent text-sm font-bold outline-none"
      />
    </label>
  );
}
