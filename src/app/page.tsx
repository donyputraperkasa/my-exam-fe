import { benefitItems } from "@/features/landing/content";
import { CreatorFooter } from "@/features/landing/creator-footer";
import { FinalCta } from "@/features/landing/final-cta";
import { HeroSection } from "@/features/landing/hero-section";
import { HowItWorks } from "@/features/landing/how-it-works";
import { MathPattern } from "@/features/landing/math-pattern";
import { StudentPreview } from "@/features/landing/student-preview";
import { BookOpenCheck, Calculator, ChartNoAxesCombined } from "lucide-react";
import { Analytics } from "@vercel/analytics/next"

const benefitIcons = [Calculator, BookOpenCheck, ChartNoAxesCombined];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <section className="relative overflow-hidden bg-[#f4f7fb] px-6 py-12">
        <MathPattern />
        <div className="relative mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
          {benefitItems.map((item, index) => {
            const Icon = benefitIcons[index];
            return (
              <article
                key={item.title}
                className={`rounded-lg border p-5 shadow-sm ${item.accent}`}
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
      <StudentPreview />
      <HowItWorks />
      <FinalCta />
      <CreatorFooter />

      <Analytics />
    </main>
  );
}
