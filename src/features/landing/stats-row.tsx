import { statItems } from "./content";

export function StatsRow() {
  return (
    <div className="grid gap-3 pb-6 sm:grid-cols-3">
      {statItems.map((item) => (
        <div key={item.label} className="border-t border-white/30 pt-3">
          <p className="text-2xl font-bold">{item.value}</p>
          <p className="mt-1 text-sm text-white/75">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
