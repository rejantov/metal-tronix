"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Loader2, Plus, Printer, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { CompanySettings, DbReceiptItem, Receipt } from "@/lib/types";
import {
  CURRENCY_SYMBOL,
  computeLine,
  computeTotals,
  emptyItem,
  formatMoney,
  generateReceiptNo,
  num,
  uniformTaxRate,
  type ReceiptItem,
} from "@/lib/receipt";
import {
  RECEIPT_LANGUAGES,
  receiptLabels,
  type ReceiptLanguage,
} from "@/lib/receipt-labels";

interface Props {
  /** null = compose a new receipt */
  receiptId: string | null;
  company: CompanySettings;
  onClose: () => void;
  onSaved: () => void;
}

interface HeaderForm {
  client_name: string;
  client_address: string;
  client_phone: string;
  client_email: string;
  client_business_no: string;
  issue_date: string;
  due_date: string;
  issued_by: string;
  type_of_goods: string;
}

const emptyHeader: HeaderForm = {
  client_name: "",
  client_address: "",
  client_phone: "",
  client_email: "",
  client_business_no: "",
  issue_date: "",
  due_date: "",
  issued_by: "",
  type_of_goods: "",
};

/** A label above a boxed column, as in the BILLED TO / FROM headers. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f0f0f0] px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#555]">
      {children}
    </div>
  );
}

/**
 * A "Label: value" line in the FROM column. Renders nothing when the value is
 * blank, so an unfilled company field leaves a dangling label on the paper.
 */
function StaticField({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  if (!value?.trim()) return null;
  return (
    <div className="flex gap-1.5 py-[3px] px-1">
      <span className="text-[#666] shrink-0">{label}:</span>
      <span className={bold ? "font-bold" : ""}>{value}</span>
    </div>
  );
}

/** The same line in the BILLED TO column, but typed into. */
function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-baseline gap-1.5 py-[3px]">
      <span className="text-[#666] shrink-0 pl-1">{label}:</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function TotalsRow({
  label,
  value,
  strong,
  divider,
}: {
  label: string;
  value: string;
  strong?: boolean;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 py-1.5 ${
        divider ? "border-t-2 border-[#111] mt-1 pt-2" : ""
      }`}
    >
      <span className={strong ? "font-bold text-[13px]" : "text-[#555]"}>{label}</span>
      <span className={strong ? "font-bold text-[13px]" : ""}>{value}</span>
    </div>
  );
}

export function ReceiptEditor({ receiptId, company, onClose, onSaved }: Props) {
  const [receiptNo, setReceiptNo] = useState("");
  const [language, setLanguage] = useState<ReceiptLanguage>("sq");
  const [header, setHeader] = useState<HeaderForm>(emptyHeader);
  const [items, setItems] = useState<ReceiptItem[]>([emptyItem(receiptLabels.sq.defaultUnit)]);
  const [amountPaid, setAmountPaid] = useState("0");
  const [loading, setLoading] = useState(receiptId !== null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const loadReceipt = useCallback(async (id: string) => {
    const [{ data: receipt }, { data: rows }] = await Promise.all([
      supabase.from("receipts").select("*").eq("id", id).single(),
      supabase.from("receipt_items").select("*").eq("receipt_id", id).order("position"),
    ]);

    if (receipt) {
      const r = receipt as Receipt;
      setReceiptNo(r.receipt_no);
      setLanguage(r.language === "en" ? "en" : "sq");
      setHeader({
        client_name: r.client_name ?? "",
        client_address: r.client_address ?? "",
        client_phone: r.client_phone ?? "",
        client_email: r.client_email ?? "",
        client_business_no: r.client_business_no ?? "",
        issue_date: r.issue_date ?? "",
        due_date: r.due_date ?? "",
        issued_by: r.issued_by ?? "",
        type_of_goods: r.type_of_goods ?? "",
      });
      setAmountPaid(String(r.amount_paid ?? 0));
    }

    if (rows && rows.length > 0) {
      setItems(
        (rows as DbReceiptItem[]).map((row) => ({
          id: row.id,
          code: row.code ?? "",
          product_name: row.product_name ?? "",
          qty: num(row.qty),
          unit: row.unit ?? "pcs",
          price_with_tax: num(row.price_with_tax),
          discount_pct: num(row.discount_pct),
          tax_rate: num(row.tax_rate),
        })),
      );
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (receiptId) {
      loadReceipt(receiptId);
    } else {
      setReceiptNo(generateReceiptNo());
      setHeader((h) => ({ ...h, issue_date: new Date().toISOString().slice(0, 10) }));
    }
  }, [receiptId]);

  // The browser's own header/footer (date, title, URL, page number) is a
  // print-dialog setting, not something CSS can touch — turning it off is the
  // only way to drop the URL and date, and that removes the page number too.
  // So we stamp our own page numbers onto the sheet just before printing.
  useEffect(() => {
    const A4_HEIGHT_MM = 297;
    const PAGE_MARGIN_MM = 12; // must match @page in globals.css
    const PX_PER_MM = 96 / 25.4;

    const clear = () =>
      document.querySelectorAll(".receipt-page-number").forEach((n) => n.remove());

    const stamp = () => {
      const sheet = document.getElementById("receipt-sheet");
      if (!sheet) return;
      clear();

      // Measure as the printer will see it: no screen padding, and without
      // the min-height that makes the sheet look like a page on screen.
      const { minHeight, padding } = sheet.style;
      sheet.style.minHeight = "0";
      sheet.style.padding = "0";
      const contentHeight = sheet.scrollHeight;
      sheet.style.minHeight = minHeight;
      sheet.style.padding = padding;

      const pageHeight = (A4_HEIGHT_MM - 2 * PAGE_MARGIN_MM) * PX_PER_MM;
      const totalPages = Math.max(1, Math.ceil(contentHeight / pageHeight - 0.02));

      for (let page = 0; page < totalPages; page++) {
        const marker = document.createElement("div");
        marker.className = "receipt-page-number";
        marker.textContent = `${page + 1} / ${totalPages}`;
        marker.style.top = `${(page + 1) * pageHeight - 22}px`;
        sheet.appendChild(marker);
      }
    };

    window.addEventListener("beforeprint", stamp);
    window.addEventListener("afterprint", clear);
    return () => {
      window.removeEventListener("beforeprint", stamp);
      window.removeEventListener("afterprint", clear);
      clear();
    };
  }, []);

  const totals = computeTotals(items, num(amountPaid));
  const sharedRate = uniformTaxRate(items);
  const L = receiptLabels[language];

  /** Switching language re-labels the document and any untouched unit cells. */
  const changeLanguage = (next: ReceiptLanguage) => {
    const previousUnit = receiptLabels[language].defaultUnit;
    setLanguage(next);
    setItems((prev) =>
      prev.map((item) =>
        item.unit === previousUnit
          ? { ...item, unit: receiptLabels[next].defaultUnit }
          : item,
      ),
    );
  };

  const setField = (key: keyof HeaderForm, value: string) =>
    setHeader((prev) => ({ ...prev, [key]: value }));

  const setItemField = (index: number, key: keyof ReceiptItem, value: string) =>
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [key]: value }
          : item,
      ),
    );

  const addRow = () => setItems((prev) => [...prev, emptyItem(L.defaultUnit)]);

  const removeRow = (index: number) =>
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));

  const handleSave = async () => {
    if (!header.client_name.trim()) {
      setError("Add the client name before saving.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const payload = {
        receipt_no: receiptNo,
        client_name: header.client_name.trim(),
        client_address: header.client_address.trim(),
        client_phone: header.client_phone.trim(),
        client_email: header.client_email.trim(),
        client_business_no: header.client_business_no.trim(),
        issue_date: header.issue_date || null,
        due_date: header.due_date || null,
        issued_by: header.issued_by.trim(),
        type_of_goods: header.type_of_goods.trim(),
        subtotal_no_tax: totals.subtotalNoTax,
        discount_total: totals.discountTotal,
        tax_total: totals.taxTotal,
        total: totals.total,
        amount_paid: num(amountPaid),
        balance_due: totals.balanceDue,
        language,
        updated_at: new Date().toISOString(),
      };

      let id = receiptId;

      if (id) {
        const { error: updateError } = await supabase
          .from("receipts")
          .update(payload)
          .eq("id", id);
        if (updateError) throw updateError;
      } else {
        // Nine random digits practically never collide, but if the unique
        // constraint ever rejects one, roll a new number instead of failing.
        let attempt = payload;
        for (let tries = 0; ; tries++) {
          const { data, error: insertError } = await supabase
            .from("receipts")
            .insert(attempt)
            .select("id, receipt_no")
            .single();

          if (!insertError) {
            id = data.id;
            setReceiptNo(data.receipt_no);
            break;
          }
          // 23505 = unique_violation on receipt_no
          if (insertError.code !== "23505" || tries >= 5) throw insertError;
          attempt = { ...attempt, receipt_no: generateReceiptNo() };
        }
      }

      // Line items are replaced wholesale — rows get added, removed and
      // reordered freely, so diffing them would buy nothing.
      await supabase.from("receipt_items").delete().eq("receipt_id", id);
      const { error: itemsError } = await supabase.from("receipt_items").insert(
        items.map((item, index) => ({
          receipt_id: id,
          position: index + 1,
          code: item.code,
          product_name: item.product_name,
          qty: num(item.qty),
          unit: item.unit,
          price_with_tax: num(item.price_with_tax),
          discount_pct: num(item.discount_pct),
          tax_rate: num(item.tax_rate),
        })),
      );
      if (itemsError) throw itemsError;

      setSavedAt(new Date().toLocaleTimeString());
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the receipt.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar — screen only */}
      <div className="print-hide flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to receipts
        </button>

        <div className="flex-1" />

        {/* The customer's language, not the admin's — saved with the receipt
            so a reprint always matches the original. */}
        <div className="flex items-center rounded-lg border border-border overflow-hidden">
          {RECEIPT_LANGUAGES.map((option) => (
            <button
              key={option.value}
              onClick={() => changeLanguage(option.value)}
              className={`px-3 py-2 text-sm transition-colors ${
                language === option.value
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {savedAt && (
          <span className="text-xs text-muted-foreground">Saved {savedAt}</span>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>

      {error && (
        <p className="print-hide mb-4 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* ─── The sheet ─────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <div id="receipt-sheet" className="mx-auto shadow-2xl">
          {/* Amount due + logo */}
          <div className="flex items-start justify-between gap-8">
            <div className="border border-[#ddd] rounded px-5 py-4 min-w-[240px]">
              <p className="text-[10px] uppercase tracking-wider text-[#666]">
                {L.amountDue}
              </p>
              <p className="mt-1 text-[34px] leading-none font-bold">
                {CURRENCY_SYMBOL} {formatMoney(totals.balanceDue)}
              </p>
            </div>

            {/* Company name with the logo beneath it. */}
            <div className="flex flex-col items-end gap-2">
              <p className="text-xl font-bold">{company.name}</p>
              {company.logo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="max-h-[70px] max-w-[190px] object-contain"
                />
              )}
            </div>
          </div>

          {/* From (us) on the left, billed to (them) on the right. */}
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <ColumnHeading>{L.from}</ColumnHeading>
              <div className="mt-2">
                <StaticField label={L.company} value={company.name} bold />
                <StaticField label={L.address} value={company.address} />
                <StaticField label={L.phone} value={company.phone} />
                <StaticField label={L.email} value={company.email} />
                <StaticField label={L.businessNo} value={company.business_no} />
                <StaticField label={L.receiptNo} value={receiptNo} bold />
              </div>
            </div>

            <div>
              <ColumnHeading>{L.billedTo}</ColumnHeading>
              <div className="mt-2">
                <InputField
                  label={L.company}
                  value={header.client_name}
                  onChange={(v) => setField("client_name", v)}
                  placeholder={L.clientName}
                />
                <InputField
                  label={L.address}
                  value={header.client_address}
                  onChange={(v) => setField("client_address", v)}
                  placeholder={L.address}
                />
                <InputField
                  label={L.phone}
                  value={header.client_phone}
                  onChange={(v) => setField("client_phone", v)}
                  placeholder={L.phone}
                />
                <InputField
                  label={L.email}
                  value={header.client_email}
                  onChange={(v) => setField("client_email", v)}
                  placeholder={L.email}
                />
                <InputField
                  label={L.businessNo}
                  value={header.client_business_no}
                  onChange={(v) => setField("client_business_no", v)}
                  placeholder={L.businessNo}
                />
              </div>
            </div>
          </div>

          {/* Receipt number, large */}
          <h1 className="mt-10 text-[30px] font-bold tracking-tight uppercase">
            {L.receiptTitle} {receiptNo}
          </h1>

          {/* Dates / issued by / goods */}
          <table className="mt-6 w-full border-collapse">
            <thead>
              <tr className="bg-[#f7f7f7] text-[9px] uppercase tracking-wider text-[#555]">
                <th className="border border-[#ddd] px-2 py-1.5 text-left font-medium w-1/4">
                  {L.date}
                </th>
                <th className="border border-[#ddd] px-2 py-1.5 text-left font-medium w-1/4">
                  {L.paymentDue}
                </th>
                <th className="border border-[#ddd] px-2 py-1.5 text-left font-medium w-1/4">
                  {L.issuedBy}
                </th>
                <th className="border border-[#ddd] px-2 py-1.5 text-left font-medium w-1/4">
                  {L.typeOfGoods}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#ddd] px-1 py-1">
                  <input
                    type="date"
                    value={header.issue_date}
                    onChange={(e) => setField("issue_date", e.target.value)}
                  />
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  <input
                    type="date"
                    value={header.due_date}
                    onChange={(e) => setField("due_date", e.target.value)}
                  />
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  <input
                    value={header.issued_by}
                    onChange={(e) => setField("issued_by", e.target.value)}
                    placeholder={L.namePlaceholder}
                  />
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  <input
                    value={header.type_of_goods}
                    onChange={(e) => setField("type_of_goods", e.target.value)}
                    placeholder={L.goodsPlaceholder}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Line items. table-fixed so 12 columns of typed-in content can
              never push the table past the edge of the paper. */}
          <table className="mt-6 w-full table-fixed border-collapse text-[10px]">
            <thead>
              <tr className="bg-[#f7f7f7] text-[8px] uppercase tracking-wider text-[#555]">
                <th className="border border-[#ddd] px-1 py-1.5 font-medium w-[3%]">
                  {L.colNo}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-left w-[8%]">
                  {L.colCode}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-left w-[20%]">
                  {L.colProduct}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[6%]">
                  {L.colQty}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-left w-[6%]">
                  {L.colUnit}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[9%]">
                  {L.colPriceWithTax}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[9%]">
                  {L.colPriceNoTax}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[6%]">
                  {L.colDiscount}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[6%]">
                  {L.colTaxPct}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[8%]">
                  {L.colTax}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[9%]">
                  {L.colPriceWithTaxAndDisc}
                </th>
                <th className="border border-[#ddd] px-1 py-1.5 font-medium text-right w-[10%]">
                  {L.colTotal}
                </th>
                <th className="print-hide w-[24px] border-none" />
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const line = computeLine(item);
                return (
                  <tr key={index} className="receipt-row">
                    <td className="border border-[#ddd] px-1 py-1 text-center text-[#666]">
                      {index + 1}
                    </td>
                    <td className="border border-[#ddd] px-0.5 py-0.5">
                      <input
                        value={item.code}
                        onChange={(e) => setItemField(index, "code", e.target.value)}
                      />
                    </td>
                    <td className="border border-[#ddd] px-0.5 py-0.5">
                      <input
                        value={item.product_name}
                        onChange={(e) =>
                          setItemField(index, "product_name", e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-[#ddd] px-0.5 py-0.5">
                      <input
                        type="number"
                        step="any"
                        className="text-right"
                        value={item.qty}
                        onChange={(e) => setItemField(index, "qty", e.target.value)}
                      />
                    </td>
                    <td className="border border-[#ddd] px-0.5 py-0.5">
                      <input
                        value={item.unit}
                        onChange={(e) => setItemField(index, "unit", e.target.value)}
                      />
                    </td>
                    <td className="border border-[#ddd] px-0.5 py-0.5">
                      <input
                        type="number"
                        step="any"
                        className="text-right"
                        value={item.price_with_tax}
                        onChange={(e) =>
                          setItemField(index, "price_with_tax", e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-[#ddd] px-1 py-1 text-right">
                      {formatMoney(line.priceNoTax)}
                    </td>
                    <td className="border border-[#ddd] px-0.5 py-0.5">
                      <input
                        type="number"
                        step="any"
                        className="text-right"
                        value={item.discount_pct}
                        onChange={(e) =>
                          setItemField(index, "discount_pct", e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-[#ddd] px-0.5 py-0.5">
                      <input
                        type="number"
                        step="any"
                        className="text-right"
                        value={item.tax_rate}
                        onChange={(e) => setItemField(index, "tax_rate", e.target.value)}
                      />
                    </td>
                    <td className="border border-[#ddd] px-1 py-1 text-right">
                      {formatMoney(line.tax)}
                    </td>
                    <td className="border border-[#ddd] px-1 py-1 text-right">
                      {formatMoney(line.priceWithTaxAndDisc)}
                    </td>
                    <td className="border border-[#ddd] px-1 py-1 text-right font-bold">
                      {formatMoney(line.total)}
                    </td>
                    <td className="print-hide border-none pl-1 align-middle">
                      <button
                        onClick={() => removeRow(index)}
                        disabled={items.length === 1}
                        title="Remove row"
                        className="text-[#bbb] hover:text-red-500 transition-colors disabled:opacity-30 disabled:hover:text-[#bbb]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={addRow}
            className="print-hide mt-2 flex items-center gap-1.5 text-[11px] text-[#3b82f6] hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            Add row
          </button>

          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-[300px]">
              <TotalsRow
                label={L.subtotalNoTax}
                value={`${CURRENCY_SYMBOL} ${formatMoney(totals.subtotalNoTax)}`}
              />
              <TotalsRow
                label={L.discount}
                value={`− ${CURRENCY_SYMBOL} ${formatMoney(totals.discountTotal)}`}
              />
              <TotalsRow
                label={sharedRate === null ? L.tax : L.taxWithRate(sharedRate)}
                value={`${CURRENCY_SYMBOL} ${formatMoney(totals.taxTotal)}`}
              />
              <TotalsRow
                label={L.total}
                value={`${CURRENCY_SYMBOL} ${formatMoney(totals.total)}`}
                strong
              />

              <div className="flex items-baseline justify-between gap-6 py-1.5">
                <span className="text-[#555]">{L.amountPaid}</span>
                <input
                  type="number"
                  step="any"
                  className="text-right w-[110px]"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
              </div>

              <TotalsRow
                label={L.balanceDue}
                value={`${CURRENCY_SYMBOL} ${formatMoney(totals.balanceDue)}`}
                strong
                divider
              />
            </div>
          </div>

          {/* Signatures */}
          <div className="receipt-signatures mt-24 grid grid-cols-2 gap-16">
            <div>
              <div className="border-t border-[#111]" />
              <p className="mt-1.5 text-[10px] text-[#555]">{L.signedIssuedBy}</p>
            </div>
            <div>
              <div className="border-t border-[#111]" />
              <p className="mt-1.5 text-[10px] text-[#555]">{L.signedReceivedBy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
