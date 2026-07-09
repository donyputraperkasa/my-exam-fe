import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <Link href={appRoutes.home} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke beranda</span>
        </Link>
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        </div>
      </section>
    </main>
  );
}
