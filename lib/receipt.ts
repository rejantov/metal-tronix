// Receipt math.
//
// Prices are entered WITH tax included (the Kosovo retail convention: the
// sticker price is what the customer pays). Everything else is derived:
//
//   1.00 with tax @ 18%  →  0.85 without tax  +  0.15 tax
//
// i.e. net = gross / 1.18, not gross * 0.82.

export const DEFAULT_TAX_RATE = 18;
export const CURRENCY_SYMBOL = "€";

/**
 * Numeric fields are `number | string` on purpose: while a row is being typed
 * into, the field holds the raw input value so clearing a box doesn't snap it
 * back to "0" mid-keystroke. Every read goes through `num()`.
 */
export interface ReceiptItem {
  id?: string;
  code: string;
  product_name: string;
  qty: number | string;
  unit: string;
  price_with_tax: number | string;
  discount_pct: number | string;
  tax_rate: number | string;
}

export interface LineMath {
  /** Unit price with the tax removed. */
  priceNoTax: number;
  /** Unit price with tax, after the line discount. */
  priceWithTaxAndDisc: number;
  /** qty × priceWithTaxAndDisc — what this line adds to the total. */
  total: number;
  /** The tax contained in `total`. */
  tax: number;
  /** `total` with the tax removed. */
  net: number;
  /** Money taken off this line by the discount. */
  discountAmount: number;
}

export interface ReceiptTotals {
  subtotalNoTax: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
  balanceDue: number;
}

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Coerce a form value to a finite number; blank and garbage both become 0. */
export function num(value: unknown): number {
  const n = typeof value === "number" ? value : parseFloat(String(value ?? ""));
  return Number.isFinite(n) ? n : 0;
}

export function emptyItem(unit = "pcs"): ReceiptItem {
  return {
    code: "",
    product_name: "",
    qty: 1,
    unit,
    price_with_tax: 0,
    discount_pct: 0,
    tax_rate: DEFAULT_TAX_RATE,
  };
}

export function computeLine(item: ReceiptItem): LineMath {
  const gross = num(item.price_with_tax);
  const qty = num(item.qty);
  const rate = num(item.tax_rate);
  const disc = num(item.discount_pct);
  const divisor = 1 + rate / 100;

  const priceNoTax = round2(gross / divisor);
  const priceWithTaxAndDisc = round2(gross * (1 - disc / 100));
  const total = round2(qty * gross * (1 - disc / 100));
  const net = round2(total / divisor);

  return {
    priceNoTax,
    priceWithTaxAndDisc,
    total,
    net,
    tax: round2(total - net),
    discountAmount: round2(qty * gross - total),
  };
}

/**
 * Sums the already-rounded line figures rather than re-deriving from raw
 * values, so the printed column always adds up to the printed footer.
 */
export function computeTotals(items: ReceiptItem[], amountPaid: number): ReceiptTotals {
  let subtotalNoTax = 0;
  let discountTotal = 0;
  let taxTotal = 0;
  let total = 0;

  for (const item of items) {
    const line = computeLine(item);
    subtotalNoTax += line.net;
    discountTotal += line.discountAmount;
    taxTotal += line.tax;
    total += line.total;
  }

  return {
    subtotalNoTax: round2(subtotalNoTax),
    discountTotal: round2(discountTotal),
    taxTotal: round2(taxTotal),
    total: round2(total),
    balanceDue: round2(total - num(amountPaid)),
  };
}

/** The tax rate shared by every line, or null when the lines disagree. */
export function uniformTaxRate(items: ReceiptItem[]): number | null {
  if (items.length === 0) return DEFAULT_TAX_RATE;
  const first = num(items[0].tax_rate);
  return items.every((i) => num(i.tax_rate) === first) ? first : null;
}

export function formatMoney(value: number): string {
  return num(value).toFixed(2);
}

export const RECEIPT_NO_PREFIX = "MTX-";
const RECEIPT_NO_DIGITS = 9;

/**
 * MTX- followed by nine random digits, e.g. MTX-408315927.
 *
 * A billion values makes a clash with the unique constraint on receipt_no
 * vanishingly unlikely, but the save path still retries with a fresh number
 * if one ever happens. Leading zeros are allowed so the width is always nine.
 */
export function generateReceiptNo(): string {
  let digits = "";
  for (let i = 0; i < RECEIPT_NO_DIGITS; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return RECEIPT_NO_PREFIX + digits;
}
