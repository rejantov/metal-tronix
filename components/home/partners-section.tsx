"use client";

import { useLanguage } from "@/lib/language-context";

const partners = [
  {
    name: "SteelForge Industries",
    logo: "SF",
  },
  {
    name: "Precision Dynamics",
    logo: "PD",
  },
  {
    name: "Alpine Manufacturing",
    logo: "AM",
  },
  {
    name: "TechMetal Solutions",
    logo: "TM",
  },
  {
    name: "Nordic Steel Works",
    logo: "NS",
  },
];

export function PartnersSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {t.partners?.subtitle || "Trusted By"}
          </span>
          <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-foreground">
            {t.partners?.title || "Our Partners"}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t.partners?.description || "We collaborate with industry leaders to deliver exceptional results"}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-border hover:border-primary/30 transition-all duration-300"
            >
              {/* Logo Placeholder */}
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {partner.logo}
                </span>
              </div>
              {/* Company Name */}
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>{t.partners?.indicator1 || "500+ Projects Delivered"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span>{t.partners?.indicator2 || "15+ Years Partnership"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>{t.partners?.indicator3 || "99.8% Quality Rate"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
