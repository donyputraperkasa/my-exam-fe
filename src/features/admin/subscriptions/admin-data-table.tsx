import type { ReactNode } from "react";

type AdminDataTableProps = {
  children: ReactNode;
  empty: boolean;
  emptyMessage: string;
  headers: string[];
  minWidth?: string;
};

export function AdminDataTable(props: AdminDataTableProps) {
  if (props.empty) {
    return (
      <p className="mt-5 rounded-xl bg-background/70 p-5 text-sm font-bold text-muted">
        {props.emptyMessage}
      </p>
    );
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-violet-100">
      <table
        className={`${props.minWidth ?? "min-w-[900px]"} w-full border-separate border-spacing-0 text-left text-sm`}
      >
        <thead>
          <tr className="text-xs font-black uppercase text-muted">
            {props.headers.map((header) => (
              <th key={header} className="border-b border-violet-100 bg-violet-50/60 px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

export function AdminTableCell({ children }: { children: ReactNode }) {
  return <td className="border-b border-violet-100/70 px-4 py-4 align-middle">{children}</td>;
}
