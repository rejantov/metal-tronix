"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { supabase } from "@/lib/supabase";
import type { Partner } from "@/lib/types";

export function PartnersSection() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("partners")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data) setPartners(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {t.partners.subtitle}
          </span>
          <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-foreground">
            {t.partners.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t.partners.description}
          </p>
        </div>

        {/* Partners Grid */}
        {partners.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors overflow-hidden">
                  {partner.logo_url ? (
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {partner.initials}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
