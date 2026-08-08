"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Quote } from "@/lib/types";

const serviceLabels: Record<string, string> = {
  "laser-cutting": "CNC Laser Cutting",
  "press-brake": "Press Brake Forming",
  "tube-cutting": "Tube & Pipe Cutting",
  "full-fabrication": "Custom Fabrication",
  assembly: "Assembly Services",
  other: "Other / Multiple Services",
};

const materialLabels: Record<string, string> = {
  "carbon-steel": "Carbon Steel (A36, 1018, etc.)",
  stainless: "Stainless Steel (304, 316, etc.)",
  aluminum: "Aluminum (5052, 6061, etc.)",
  "ar-plate": "AR Plate (AR400, AR500, Hardox)",
  copper: "Copper / Brass",
  other: "Other / Multiple Materials",
};

const quantityLabels: Record<string, string> = {
  prototype: "Prototype (1–5 pieces)",
  small: "Small Run (6–50 pieces)",
  medium: "Medium Run (51–500 pieces)",
  production: "Production (500+ pieces)",
  kanban: "Kanban / Blanket Order",
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-foreground font-medium">{value}</p>
    </div>
  );
}

export function QuoteInbox() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quote | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const { data } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setQuotes(data);
    setLoading(false);
  };

  const openQuote = async (quote: Quote) => {
    setSelected(quote);
    if (!quote.read) {
      await supabase.from("quotes").update({ read: true }).eq("id", quote.id);
      setQuotes((prev) => prev.map((q) => (q.id === quote.id ? { ...q, read: true } : q)));
    }
  };

  const unreadCount = quotes.filter((q) => !q.read).length;

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
          Quote Inbox
          {unreadCount > 0 && (
            <span className="text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
              {unreadCount} unread
            </span>
          )}
        </h2>
        <span className="text-sm text-muted-foreground">{quotes.length} total</span>
      </div>

      {quotes.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No quote requests yet.</div>
      ) : (
        <div className="space-y-2">
          {quotes.map((quote) => (
            <button
              key={quote.id}
              onClick={() => openQuote(quote)}
              className={`w-full text-left p-4 rounded-xl border transition-all hover:border-primary/50 ${
                !quote.read ? "border-primary/30 bg-primary/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {!quote.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p
                      className={`text-sm truncate ${
                        !quote.read
                          ? "font-semibold text-foreground"
                          : "font-medium text-foreground/80"
                      }`}
                    >
                      {quote.name}
                      {quote.company && (
                        <span className="text-muted-foreground font-normal">
                          {" "}
                          — {quote.company}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {serviceLabels[quote.service] || quote.service}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(quote.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Quote Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Quote Request</h3>
              <button
                onClick={() => setSelected(null)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name" value={selected.name} />
                {selected.company && <Field label="Company" value={selected.company} />}
                <Field label="Email" value={selected.email} />
                {selected.phone && <Field label="Phone" value={selected.phone} />}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border">
                <Field
                  label="Service Needed"
                  value={serviceLabels[selected.service] || selected.service}
                />
                {selected.material && (
                  <Field
                    label="Primary Material"
                    value={materialLabels[selected.material] || selected.material}
                  />
                )}
                {selected.quantity && (
                  <Field
                    label="Estimated Quantity"
                    value={quantityLabels[selected.quantity] || selected.quantity}
                  />
                )}
              </div>

              <div className="pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Project Details
                </p>
                <p className="text-sm text-foreground whitespace-pre-wrap bg-background rounded-lg p-4 leading-relaxed">
                  {selected.message}
                </p>
              </div>

              <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                Received:{" "}
                {new Date(selected.created_at).toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
