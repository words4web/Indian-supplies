import type { Product } from './catalogue'

export interface CartItem {
  product: Product
  quantity: number
}

export interface DeliveryDetails {
  businessName: string
  contactPerson: string
  phone: string
  address: string
  notes?: string
}

export interface OrderConfirmation {
  orderId: string
  placedAt: string
  itemCount: number
  total: number
  delivery: DeliveryDetails
}

export interface AuthUser {
  id: string
  name: string
  email: string
  business: string
}
