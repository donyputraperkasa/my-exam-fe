type TextAreaProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export function QuestionTextArea({ label, onChange, value }: TextAreaProps) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-black text-foreground">
      {label}
      <textarea
        required={label === "Soal"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded-lg border border-violet-100 bg-white p-3 text-sm font-bold outline-none focus:border-violet-300"
      />
    </label>
  );
}

type OptionInputProps = {
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
  onCheck: (label: string) => void;
  value: string;
};

export function QuestionOptionInput(props: OptionInputProps) {
  return (
    <label className="grid gap-2 text-sm font-black text-foreground">
      Pilihan {props.label}
      <div className="flex items-center gap-3">
        <input
          type="radio"
          checked={props.checked}
          onChange={() => props.onCheck(props.label)}
        />
        <input
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          className="h-11 flex-1 rounded-lg border border-violet-100 bg-white px-3 text-sm font-bold outline-none focus:border-violet-300"
        />
      </div>
    </label>
  );
}
