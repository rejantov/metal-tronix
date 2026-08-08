export interface DbProduct {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  created_at: string
}

export interface Quote {
  id: string
  name: string
  company: string | null
  email: string
  phone: string | null
  service: string
  material: string | null
  quantity: string | null
  message: string
  created_at: string
  read: boolean
}

export interface CompanySettings {
  id: number
  name: string
  address: string
  phone: string
  email: string
  business_no: string
  logo_url: string | null
  updated_at: string
}

export interface Receipt {
  id: string
  receipt_no: string
  client_name: string
  client_address: string
  client_phone: string
  client_email: string
  client_business_no: string
  issue_date: string | null
  due_date: string | null
  issued_by: string
  type_of_goods: string
  subtotal_no_tax: number
  discount_total: number
  tax_total: number
  total: number
  amount_paid: number
  balance_due: number
  currency: string
  language: 'sq' | 'en'
  created_at: string
  updated_at: string
}

export interface DbReceiptItem {
  id: string
  receipt_id: string
  position: number
  code: string
  product_name: string
  qty: number
  unit: string
  price_with_tax: number
  discount_pct: number
  tax_rate: number
}

export interface Partner {
  id: string
  name: string
  logo_url: string | null
  initials: string
  created_at: string
  display_order: number
}
