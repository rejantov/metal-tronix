// Wording for the printed receipt.
//
// This is deliberately separate from lib/translations.ts: that file is the
// marketing site's copy in three languages, while a receipt is a document
// handed to a customer. Only the two languages customers actually get
// receipts in are here — German is not one of them.

export type ReceiptLanguage = "sq" | "en";

export const RECEIPT_LANGUAGES: Array<{ value: ReceiptLanguage; label: string }> = [
  { value: "sq", label: "Shqip" },
  { value: "en", label: "English" },
];

export interface ReceiptLabels {
  amountDue: string;
  billedTo: string;
  from: string;
  company: string;
  clientName: string;
  address: string;
  phone: string;
  email: string;
  businessNo: string;
  receiptNo: string;
  receiptTitle: string;
  date: string;
  paymentDue: string;
  issuedBy: string;
  typeOfGoods: string;
  namePlaceholder: string;
  goodsPlaceholder: string;
  colNo: string;
  colCode: string;
  colProduct: string;
  colQty: string;
  colUnit: string;
  colPriceWithTax: string;
  colPriceNoTax: string;
  colDiscount: string;
  colTaxPct: string;
  colTax: string;
  colPriceWithTaxAndDisc: string;
  colTotal: string;
  subtotalNoTax: string;
  discount: string;
  tax: string;
  taxWithRate: (rate: number) => string;
  total: string;
  amountPaid: string;
  balanceDue: string;
  signedIssuedBy: string;
  signedReceivedBy: string;
  defaultUnit: string;
}

const sq: ReceiptLabels = {
  amountDue: "Shuma për pagesë",
  billedTo: "Faturuar për",
  from: "Nga",
  company: "Kompania",
  clientName: "Emri i klientit",
  address: "Adresa",
  phone: "Telefoni",
  email: "Email",
  businessNo: "Nr. i biznesit",
  receiptNo: "Nr. i faturës",
  receiptTitle: "FATURË",
  date: "Data",
  paymentDue: "Afati i pagesës",
  issuedBy: "Lëshuar nga",
  typeOfGoods: "Lloji i mallit",
  namePlaceholder: "Emri",
  goodsPlaceholder: "p.sh. Mall",
  colNo: "Nr",
  colCode: "Kodi",
  colProduct: "Emri i produktit",
  colQty: "Sasia",
  colUnit: "Njësia",
  colPriceWithTax: "Çmimi me TVSH",
  colPriceNoTax: "Çmimi pa TVSH",
  colDiscount: "Zbritja %",
  colTaxPct: "TVSH %",
  colTax: "TVSH",
  colPriceWithTaxAndDisc: "Çmimi me TVSH dhe zbritje",
  colTotal: "Totali",
  subtotalNoTax: "Nëntotali (pa TVSH)",
  discount: "Zbritja",
  tax: "TVSH",
  taxWithRate: (rate) => `TVSH (${rate}%)`,
  total: "Totali",
  amountPaid: "Shuma e paguar",
  balanceDue: "Mbetja për pagesë",
  signedIssuedBy: "Lëshuar nga",
  signedReceivedBy: "Pranuar nga",
  defaultUnit: "copë",
};

const en: ReceiptLabels = {
  amountDue: "Amount due",
  billedTo: "Billed to",
  from: "From",
  company: "Company",
  clientName: "Client name",
  address: "Address",
  phone: "Phone",
  email: "Email",
  businessNo: "Business no.",
  receiptNo: "Receipt no.",
  receiptTitle: "RECEIPT",
  date: "Date",
  paymentDue: "Payment due",
  issuedBy: "Issued by",
  typeOfGoods: "Type of goods",
  namePlaceholder: "Name",
  goodsPlaceholder: "e.g. Merchandise",
  colNo: "No",
  colCode: "Code",
  colProduct: "Product name",
  colQty: "Qty",
  colUnit: "Unit",
  colPriceWithTax: "Price w/ tax",
  colPriceNoTax: "Price no tax",
  colDiscount: "Disc. %",
  colTaxPct: "Tax %",
  colTax: "Tax",
  colPriceWithTaxAndDisc: "Price w/ tax & disc.",
  colTotal: "Total",
  subtotalNoTax: "Subtotal (excl. tax)",
  discount: "Discount",
  tax: "Tax",
  taxWithRate: (rate) => `Tax (${rate}%)`,
  total: "Total",
  amountPaid: "Amount paid",
  balanceDue: "Balance due",
  signedIssuedBy: "Issued by",
  signedReceivedBy: "Received by",
  defaultUnit: "pcs",
};

export const receiptLabels: Record<ReceiptLanguage, ReceiptLabels> = { sq, en };
