"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const products = [
  {
    id: 1,
    titleKey: "Precision Laser Cut Components",
    categoryKey: "laserCutting",
    description:
      "Intricate stainless steel components with ±0.003\" tolerance. 304 SS, 16 gauge, nitrogen assist for oxide-free edges.",
    specs: {
      material: "304 Stainless Steel",
      thickness: "16 gauge (0.060\")",
      tolerance: "±0.003\"",
      finish: "Mill finish, deburring included",
    },
    image: "/images/product-1.jpg",
  },
  {
    id: 2,
    titleKey: "Press Brake Formed Enclosures",
    categoryKey: "brakeForming",
    description:
      "Multi-bend aluminum enclosure panels with tight angular tolerances. 5052-H32 aluminum for excellent formability.",
    specs: {
      material: "5052-H32 Aluminum",
      thickness: "0.090\"",
      tolerance: "±0.5° angular",
      finish: "Ready for powder coat",
    },
    image: "/images/product-2.jpg",
  },
  {
    id: 3,
    titleKey: "Structural Weldments",
    categoryKey: "customFab",
    description:
      "Heavy-duty welded steel assemblies with PEM hardware insertion. Full MIG welding per AWS D1.1 standards.",
    specs: {
      material: "A36 Mild Steel",
      thickness: "3/16\" - 1/2\"",
      welding: "AWS D1.1 certified",
      hardware: "PEM studs & standoffs",
    },
    image: "/images/product-3.jpg",
  },
  {
    id: 4,
    titleKey: "Tube Laser Cutting",
    categoryKey: "tubePipe",
    description:
      "Complex tube profiles with cope cuts and notches. Eliminates secondary operations for weld-ready assembly.",
    specs: {
      material: "DOM Steel Tubing",
      size: "2\" x 2\" x 0.120\" wall",
      tolerance: "±0.005\"",
      finish: "Weld-ready, no deburring needed",
    },
    image: "/images/product-4.jpg",
  },
  {
    id: 5,
    titleKey: "Precision Mounting Brackets",
    categoryKey: "laserCutting",
    description:
      "High-volume production run of mounting brackets. Nested for optimal material yield with full traceability.",
    specs: {
      material: "1008 CRS",
      thickness: "11 gauge (0.120\")",
      quantity: "5,000 pcs/release",
      delivery: "Kanban program",
    },
    image: "/images/product-5.jpg",
  },
  {
    id: 6,
    titleKey: "Electronic Chassis",
    categoryKey: "assemblies",
    description:
      "Complete electronic enclosure with ventilation slots, mounting bosses, and hardware. Powder coat ready.",
    specs: {
      material: "5052 Aluminum",
      thickness: "0.063\"",
      hardware: "Clinch nuts & standoffs",
      finish: "Chem film prep for paint",
    },
    image: "/images/product-6.jpg",
  },
];

type CategoryKey = "laserCutting" | "brakeForming" | "tubePipe" | "customFab" | "assemblies";

export function ProductGallery() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"all" | CategoryKey>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      : products.filter((p) => p.categoryKey === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredProducts.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredProducts.length - 1 ? 0 : prev + 1
    );
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.titleKey}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
                  {categoryMap[product.categoryKey as CategoryKey]}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {product.titleKey}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
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
                    src={filteredProducts[currentIndex].image}
                    alt={filteredProducts[currentIndex].titleKey}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
                    {categoryMap[filteredProducts[currentIndex].categoryKey as CategoryKey]}
                  </span>
                  <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-foreground">
                    {filteredProducts[currentIndex].titleKey}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {filteredProducts[currentIndex].description}
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20">
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                      {t.products.specs.material}
                    </h4>
                    <dl className="grid grid-cols-2 gap-3">
                      {Object.entries(
                        filteredProducts[currentIndex].specs
                      ).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-xs text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </dt>
                          <dd className="text-sm font-medium text-foreground">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

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
