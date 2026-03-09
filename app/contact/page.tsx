"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">
              {t.contact.subtitle}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              {t.contact.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t.contact.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {t.contact.info.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{t.contact.info.address.label}</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {t.contact.info.address.value}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{t.contact.info.phone.label}</p>
                        <a
                          href="tel:+15551234567"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {t.contact.info.phone.value}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{t.contact.info.email.label}</p>
                        <a
                          href="mailto:quotes@metaltronix.com"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {t.contact.info.email.value}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{t.contact.info.hours.label}</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {t.contact.info.hours.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    {t.contact.certifications.title}
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {t.contact.certifications.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.contact.form.title}</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
