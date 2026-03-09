"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern with Blue Gradient */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,150,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,150,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 to-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-accent/15 to-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-secondary/80 border border-primary/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">
              {t.hero.tagline}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight text-balance mb-6">
            {t.hero.title.split(" ").slice(0, -1).join(" ")}
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t.hero.title.split(" ").slice(-1)}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity px-8 h-12 shadow-lg shadow-primary/25"
            >
              <Link href="/contact">
                {t.hero.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 px-8 h-12"
            >
              <Link href="/products">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-primary/20">
              <Zap className="w-6 h-6 text-primary mb-2" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">6kW</span>
              <span className="text-sm text-muted-foreground">{t.hero.stats.laserPower}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-primary/20">
              <Shield className="w-6 h-6 text-primary mb-2" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">±0.005&quot;</span>
              <span className="text-sm text-muted-foreground">{t.hero.stats.tolerance}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-primary/20">
              <Clock className="w-6 h-6 text-primary mb-2" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">37+</span>
              <span className="text-sm text-muted-foreground">{t.hero.stats.experience}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
