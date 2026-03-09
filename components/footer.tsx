"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-card to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Metal Tronix
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t.footer.services}
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-muted-foreground">
                  {t.services.laserCutting.title}
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  {t.services.brakeFoming.title}
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  {t.services.tubeCutting.title}
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  {t.services.customFab.title}
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.history}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">
                1234 Industrial Parkway
              </li>
              <li className="text-sm text-muted-foreground">
                Manufacturing District
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@metaltronix.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@metaltronix.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Metal Tronix. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">
              ISO 9001:2015 Certified
            </span>
            <span className="text-xs text-muted-foreground">
              AS9100D Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
