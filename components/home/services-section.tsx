"use client";

import { Crosshair, Layers, Cylinder, Wrench } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const serviceIcons = [Crosshair, Layers, Cylinder, Wrench];

export function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: serviceIcons[0],
      ...t.services.laserCutting,
    },
    {
      icon: serviceIcons[1],
      ...t.services.brakeFoming,
    },
    {
      icon: serviceIcons[2],
      ...t.services.tubeCutting,
    },
    {
      icon: serviceIcons[3],
      ...t.services.customFab,
    },
  ];

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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 rounded-xl bg-gradient-to-br from-background via-background to-primary/5 border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((spec: string) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
