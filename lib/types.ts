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

export interface Partner {
  id: string
  name: string
  logo_url: string | null
  initials: string
  created_at: string
  display_order: number
}
