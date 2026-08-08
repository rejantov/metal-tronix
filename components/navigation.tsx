"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/metal-tronix-3.png"
              alt="Metal Tronix"
              width={40}
              height={40}
              className="rounded-sm"
            />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Metal Tronix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.products}
            </Link>
            <Link
              href="/history"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.history}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
              <Link href="/contact">{t.nav.getQuote}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="text-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.products}
              </Link>
              <Link
                href="/history"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.history}
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.contact}
              </Link>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  {t.nav.getQuote}
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
