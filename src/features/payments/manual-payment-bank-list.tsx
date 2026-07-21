"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type {
  ManualPaymentBank,
  ManualPaymentConfig,
} from "./manual-payments-api";
import { BankLogo, getBankBrand } from "./manual-payment-bank-brand";

const MANDIRI_ACCOUNT = "1370016948529";

function getBanks(config: ManualPaymentConfig) {
  const banks = config.banks?.length ? [...config.banks] : [config.bank];
  const hasMandiri = banks.some(
    (bank) => bank.accountNumber === MANDIRI_ACCOUNT,
  );

  if (!hasMandiri) {
    banks.push({
      name: "Mandiri",
      accountNumber: MANDIRI_ACCOUNT,
      accountHolder: config.bank.accountHolder,
    });
  }

  return banks.filter(
    (bank) => bank.name && bank.accountNumber && bank.accountHolder,
  );
}

async function copyAccountNumber(accountNumber: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(accountNumber);
    return;
  }

  const input = document.createElement("textarea");
  input.value = accountNumber;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export function ManualPaymentBankList({
  config,
}: {
  config: ManualPaymentConfig;
}) {
  const [copied, setCopied] = useState("");

  async function copy(bank: ManualPaymentBank) {
    try {
      await copyAccountNumber(bank.accountNumber);
      setCopied(bank.accountNumber);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {getBanks(config).map((bank) => {
        const isCopied = copied === bank.accountNumber;
        const brand = getBankBrand(bank.name);

        return (
          <article
            key={`${bank.name}-${bank.accountNumber}`}
            className={`min-w-0 rounded-xl border p-4 shadow-sm ${brand.card}`}
          >
            <div className="flex items-center justify-between gap-3">
              <BankLogo name={bank.name} brand={brand} />
              <button
                type="button"
                onClick={() => void copy(bank)}
                className={`inline-flex h-9 items-center gap-2 rounded-lg border bg-white px-3 text-xs font-black transition ${brand.button}`}
                aria-label={`Salin nomor rekening ${bank.name}`}
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {isCopied ? "Tersalin" : "Salin"}
              </button>
            </div>
            <p
              className={`mt-3 break-all text-xl font-black tracking-wide ${brand.number}`}
            >
              {bank.accountNumber}
            </p>
            <p className="mt-2 text-xs font-bold leading-5 text-muted">
              a.n. {bank.accountHolder}
            </p>
          </article>
        );
      })}
    </div>
  );
}
