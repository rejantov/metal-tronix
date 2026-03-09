"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-background via-background to-primary/10 border border-primary/20 overflow-hidden">
          {/* Background Pattern & Gradients */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(100,150,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,150,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-[60px]" />
          
          <div className="relative px-8 py-16 sm:px-12 lg:px-16 lg:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance mb-6">
                {t.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t.cta.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                {t.cta.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity px-10 h-14 text-lg shadow-lg shadow-primary/25"
              >
                <Link href="/contact">
                  {t.cta.button}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
