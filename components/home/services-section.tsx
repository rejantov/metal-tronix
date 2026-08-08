"use client";

import { Crosshair, Layers, Wrench, Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-card via-card to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
            {t.services.subtitle}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            {t.services.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            {t.services.description}
          </p>
        </div>

        {/* Top Row: Laser Cutting + Press Brake */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Laser Cutting */}
          <div className="group relative p-8 rounded-xl bg-gradient-to-br from-background via-background to-primary/5 border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Crosshair className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t.services.laserCutting.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.services.laserCutting.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.services.laserCutting.features.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex px-3 py-1 text-xs font-medium text-primary bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Press Brake Forming */}
          <div className="group relative p-8 rounded-xl bg-gradient-to-br from-background via-background to-primary/5 border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Layers className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t.services.brakeFoming.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.services.brakeFoming.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.services.brakeFoming.features.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex px-3 py-1 text-xs font-medium text-primary bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Full-width Custom Fabrication */}
        <div className="group relative p-8 rounded-xl bg-gradient-to-br from-background via-background to-primary/5 border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Wrench className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t.services.customFab.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.services.customFab.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {t.services.customFab.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
