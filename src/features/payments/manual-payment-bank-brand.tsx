import Image from "next/image";
import { Landmark } from "lucide-react";

type BankBrand = {
  card: string;
  button: string;
  number: string;
  logo?: string;
  logoAlt?: string;
};

const BCA: BankBrand = {
  card: "border-[#8cc8ef] border-l-4 border-l-[#0066ae] bg-[#eef8ff]",
  button:
    "border-[#8cc8ef] text-[#0066ae] hover:border-[#0066ae] hover:bg-[#dff2ff]",
  number: "text-[#005596]",
  logo: "/images/banks/bca.svg",
  logoAlt: "BCA",
};

const MANDIRI: BankBrand = {
  card: "border-[#f5c242] border-l-4 border-l-[#003d79] bg-[#f6f9fc]",
  button:
    "border-[#f5c242] text-[#003d79] hover:border-[#003d79] hover:bg-[#fff7d6]",
  number: "text-[#003d79]",
  logo: "/images/banks/mandiri.svg",
  logoAlt: "Bank Mandiri",
};

const DEFAULT: BankBrand = {
  card: "border-violet-200 border-l-4 border-l-violet-600 bg-violet-50",
  button:
    "border-violet-200 text-violet-700 hover:border-violet-600 hover:bg-violet-100",
  number: "text-violet-800",
};

export function getBankBrand(name: string) {
  const normalized = name.trim().toLowerCase();
  if (normalized.includes("bca") || normalized.includes("central asia")) {
    return BCA;
  }
  if (normalized.includes("mandiri")) return MANDIRI;
  return DEFAULT;
}

export function BankLogo({ name, brand }: { name: string; brand: BankBrand }) {
  if (brand.logo) {
    return (
      <div className="flex h-11 w-32 items-center rounded-lg bg-white px-3 shadow-sm">
        <Image
          src={brand.logo}
          alt={`Logo ${brand.logoAlt}`}
          width={120}
          height={40}
          className="h-8 w-auto max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex h-11 items-center gap-2 rounded-lg bg-white px-3 font-black text-violet-700 shadow-sm">
      <Landmark className="h-5 w-5" />
      {name}
    </div>
  );
}
