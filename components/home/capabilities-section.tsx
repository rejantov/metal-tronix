"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function CapabilitiesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-card relative overflow-hidden">
      {/* Background gradient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Materials */}
          <div>
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
              {t.capabilities.subtitle}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8">
              {t.capabilities.materials.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.capabilities.materials.items.map((material) => (
                <div
                  key={material.name}
                  className="flex flex-col gap-1 p-4 rounded-lg bg-gradient-to-r from-card to-card/80 border border-border hover:border-primary/30 transition-colors"
                >
                  <span className="font-medium text-foreground">
                    {material.name}
                  </span>
                  <span className="text-sm text-primary leading-snug">
                    {material.spec}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div>
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
              {t.capabilities.subtitle}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8">
              {t.capabilities.technical.title}
            </h2>
            <div className="flex flex-col gap-2">
              {t.capabilities.technical.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 min-w-0">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-sm text-primary font-medium shrink-0 sm:ml-4 sm:text-right">
                      {item.spec}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
