import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { PartnersSection } from "@/components/home/partners-section";
import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CapabilitiesSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </main>
  );
}
