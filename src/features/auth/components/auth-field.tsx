"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthFieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

export function AuthField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
      {label}
      <span className="flex h-11 overflow-hidden rounded-md border border-border bg-white transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/15">
        <input
          required
          minLength={isPassword ? 6 : undefined}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="inline-flex w-11 shrink-0 items-center justify-center border-l border-border text-muted transition hover:bg-violet-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
            aria-pressed={showPassword}
            title={showPassword ? "Sembunyikan password" : "Lihat password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        ) : null}
      </span>
    </label>
  );
}
