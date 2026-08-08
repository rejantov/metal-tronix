"use client";

import { useState, useEffect, useCallback } from "react";
import { FileText, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { CompanySettings, Receipt } from "@/lib/types";
import { CURRENCY_SYMBOL, formatMoney } from "@/lib/receipt";
import { ReceiptEditor } from "./receipt-editor";

/** null = list view, string = editing that id, "new" = composing. */
type View = { mode: "list" } | { mode: "edit"; id: string | null };

export function ReceiptManager() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [company, setCompany] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>({ mode: "list" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    const [{ data: receiptRows }, { data: settings }] = await Promise.all([
      supabase.from("receipts").select("*").order("created_at", { ascending: false }),
      supabase.from("company_settings").select("*").eq("id", 1).single(),
    ]);
    if (receiptRows) setReceipts(receiptRows as Receipt[]);
    if (settings) setCompany(settings as CompanySettings);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleDelete = async (receipt: Receipt) => {
    const ok = window.confirm(
      `Delete receipt ${receipt.receipt_no} for ${receipt.client_name || "—"}? This cannot be undone.`,
    );
    if (!ok) return;

    setDeletingId(receipt.id);
    // receipt_items rows go with it via ON DELETE CASCADE.
    await supabase.from("receipts").delete().eq("id", receipt.id);
    setReceipts((prev) => prev.filter((r) => r.id !== receipt.id));
    setDeletingId(null);
  };

  // Matches the receipt number, the client name, or the total — whichever the
  // person at the desk happens to remember.
  const term = query.trim().toLowerCase();
  const filtered = term
    ? receipts.filter(
        (r) =>
          r.receipt_no.toLowerCase().includes(term) ||
          r.client_name.toLowerCase().includes(term) ||
          formatMoney(r.total).includes(term) ||
          formatMoney(r.balance_due).includes(term),
      )
    : receipts;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!company) {
    return (
      <p className="text-sm text-muted-foreground">
        Could not load your company details. Run the SQL setup in Supabase, then
        fill in the Settings tab.
      </p>
    );
  }

  if (view.mode === "edit") {
    return (
      <ReceiptEditor
        receiptId={view.id}
        company={company}
        onClose={() => setView({ mode: "list" })}
        onSaved={fetchAll}
      />
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by client, receipt no. or amount…"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <button
          onClick={() => setView({ mode: "edit", id: null })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New receipt
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">
            {receipts.length === 0
              ? "No receipts yet. Create your first one."
              : `No receipts match "${query}".`}
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left font-medium px-4 py-3">Receipt no.</th>
                <th className="text-left font-medium px-4 py-3">Client</th>
                <th className="text-left font-medium px-4 py-3">Date</th>
                <th className="text-right font-medium px-4 py-3">Total</th>
                <th className="text-right font-medium px-4 py-3">Balance due</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((receipt) => (
                <tr
                  key={receipt.id}
                  onClick={() => setView({ mode: "edit", id: receipt.id })}
                  className="border-t border-border hover:bg-secondary/40 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {receipt.receipt_no}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {receipt.client_name || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {receipt.issue_date ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    {CURRENCY_SYMBOL} {formatMoney(receipt.total)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium ${
                      Number(receipt.balance_due) > 0
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {CURRENCY_SYMBOL} {formatMoney(receipt.balance_due)}
                  </td>
                  <td className="px-2 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(receipt);
                      }}
                      disabled={deletingId === receipt.id}
                      title="Delete receipt"
                      className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
                    >
                      {deletingId === receipt.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
