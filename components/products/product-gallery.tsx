"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { supabase } from "@/lib/supabase";
import type { DbProduct } from "@/lib/types";

type CategoryKey = "laserCutting" | "brakeForming" | "tubePipe" | "customFab" | "assemblies";

const categoryToKey: Record<string, CategoryKey> = {
  "Laser Cutting": "laserCutting",
  "Press Brake Forming": "brakeForming",
  "Tube & Pipe": "tubePipe",
  "Custom Fabrication": "customFab",
  "Assemblies": "assemblies",
};

export function ProductGallery() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<"all" | CategoryKey>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const categoryMap: Record<CategoryKey, string> = {
    laserCutting: t.products.categories.laserCutting,
    brakeForming: t.products.categories.brakeForming,
    tubePipe: t.products.categories.tubePipe,
    customFab: t.products.categories.customFab,
    assemblies: t.products.categories.assemblies,
  };

  const categories: Array<{ key: "all" | CategoryKey; label: string }> = [
    { key: "all", label: t.products.filterAll },
    { key: "laserCutting", label: t.products.categories.laserCutting },
    { key: "brakeForming", label: t.products.categories.brakeForming },
    { key: "tubePipe", label: t.products.categories.tubePipe },
    { key: "customFab", label: t.products.categories.customFab },
    { key: "assemblies", label: t.products.categories.assemblies },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => categoryToKey[p.category] === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? filteredProducts.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === filteredProducts.length - 1 ? 0 : prev + 1));

  if (loading) {
    return (
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.key
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
                    {categoryMap[categoryToKey[product.category]] || product.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && filteredProducts[currentIndex] && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t.products.close}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={goToPrevious}
              className="absolute left-4 lg:left-8 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 lg:right-8 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="max-w-6xl w-full mx-4 lg:mx-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden border border-primary/20">
                  <Image
                    src={filteredProducts[currentIndex].image_url}
                    alt={filteredProducts[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
                    {categoryMap[categoryToKey[filteredProducts[currentIndex].category]] ||
                      filteredProducts[currentIndex].category}
                  </span>
                  <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-foreground">
                    {filteredProducts[currentIndex].title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {filteredProducts[currentIndex].description}
                  </p>
                  <Button
                    asChild
                    className="mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <a href="/contact">{t.nav.getQuote}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
