"use client";

import { useLanguage } from "@/lib/language-context";

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-card relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            37 Years of Growth
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line with gradient */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary md:-translate-x-px" />

          {/* Milestones */}
          <div className="space-y-12">
            {t.timeline.items.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 pl-12 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div
                    className={`p-6 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20 hover:border-primary/40 transition-colors ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    } max-w-lg`}
                  >
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {milestone.year}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Dot with gradient */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent md:-translate-x-2 mt-8 md:mt-6 shadow-lg shadow-primary/30" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
