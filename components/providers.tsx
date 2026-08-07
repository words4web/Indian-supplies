'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from '@/types/catalogue'
import type { AuthUser, CartItem, OrderConfirmation } from '@/types/order'

const CART_KEY = 'indian-supplies-cart'
const USER_KEY = 'indian-supplies-user'
const ORDER_KEY = 'indian-supplies-last-order'

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  ready: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

interface AuthContextValue {
  user: AuthUser | null
  ready: boolean
  signIn: (user: AuthUser) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = window.sessionStorage.getItem(CART_KEY)
    if (saved) {
      try {
        setItems(JSON.parse(saved) as CartItem[])
      } catch {
        window.sessionStorage.removeItem(CART_KEY)
      }
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) window.sessionStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items, ready])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready,
      addItem: (product, quantity = 1) =>
        setItems((current) => {
          const existing = current.find((item) => item.product.id === product.id)
          if (existing) {
            return current.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
                : item,
            )
          }
          return [...current, { product, quantity }]
        }),
      updateQuantity: (id, quantity) =>
        setItems((current) =>
          quantity <= 0
            ? current.filter((item) => item.product.id !== id)
            : current.map((item) =>
                item.product.id === id ? { ...item, quantity: Math.min(99, quantity) } : item,
              ),
        ),
      removeItem: (id) => setItems((current) => current.filter((item) => item.product.id !== id)),
      clearCart: () => setItems([]),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0),
    }),
    [items, ready],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = window.sessionStorage.getItem(USER_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved) as AuthUser)
      } catch {
        window.sessionStorage.removeItem(USER_KEY)
      }
    }
    setReady(true)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      signIn: (next) => {
        setUser(next)
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(next))
      },
      signOut: () => {
        setUser(null)
        window.sessionStorage.removeItem(USER_KEY)
      },
    }),
    [user, ready],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within Providers')
  return context
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within Providers')
  return context
}

export function saveLastOrder(order: OrderConfirmation) {
  window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order))
}

export function readLastOrder(): OrderConfirmation | null {
  const saved = window.sessionStorage.getItem(ORDER_KEY)
  if (!saved) return null
  try {
    return JSON.parse(saved) as OrderConfirmation
  } catch {
    return null
  }
}
