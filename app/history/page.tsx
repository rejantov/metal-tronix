"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Timeline } from "@/components/history/timeline";
import { Values } from "@/components/history/values";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function HistoryPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
                {t.history.subtitle}
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                {t.history.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {t.history.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                <div className="p-4 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">4+</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Years in Business
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">50k</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sq Ft Facility
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">150+</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Team Members
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-primary/20">
              <Image
                src="/images/facility.jpg"
                alt="Metal Tronix manufacturing facility"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden order-2 lg:order-1 border border-primary/20">
              <Image
                src="/images/founder.jpg"
                alt={t.history.founderName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
                The Founder
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Built on Craftsmanship
              </h2>
              <blockquote className="mt-6 text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                {t.history.founderQuote}
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-foreground">
                  {t.history.founderName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.history.founderTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Timeline />
      <Values />
      <Footer />
    </main>
  );
}
