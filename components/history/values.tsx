"use client";

import { Target, Users, Lightbulb, Shield } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const valueIcons = [Target, Users, Lightbulb, Shield];

export function Values() {
  const { t } = useLanguage();

  const values = [
    { icon: valueIcons[0], ...t.history.values.precision },
    { icon: valueIcons[1], ...t.history.values.partnership },
    { icon: valueIcons[2], ...t.history.values.innovation },
    { icon: valueIcons[3], ...t.history.values.integrity },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
            What Drives Us
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            {t.history.values.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-8 rounded-xl bg-gradient-to-br from-background to-primary/5 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                <value.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
