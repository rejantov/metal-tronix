"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductGallery } from "@/components/products/product-gallery";
import { useLanguage } from "@/lib/language-context";

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-[80px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
              {t.products.subtitle}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              {t.products.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t.products.description}
            </p>
          </div>
        </div>
      </section>

      <ProductGallery />
      <Footer />
    </main>
  );
}
