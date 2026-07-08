type AuthFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

export function AuthField({
  label,
  type = "text",
  value,
  onChange,
}: AuthFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500"
      />
    </label>
  );
}
