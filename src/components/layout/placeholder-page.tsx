import Link from "next/link";
import { appRoutes } from "@/lib/routes";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <Link href={appRoutes.home} className="text-sm font-medium text-blue-700">
          Kembali ke beranda
        </Link>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </section>
    </main>
  );
}
