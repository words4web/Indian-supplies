'use client'

import Link from 'next/link'
import { ArrowRight, PackageCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PortalHeader } from '@/components/portal-header'
import { readLastOrder, useAuth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import type { OrderConfirmation } from '@/types/order'

export default function OrdersPage() {
  const { user, ready } = useAuth()
  const [order, setOrder] = useState<OrderConfirmation | null>(null)

  useEffect(() => {
    if (ready) setOrder(readLastOrder())
  }, [ready])

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div className="border-b border-border/70 pb-8">
          <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">Order history</p>
          <h1 className="mt-2 font-serif text-4xl font-extrabold tracking-tight">My orders</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Review recent wholesale orders placed from this browser.</p>
        </div>
        {!ready ? <p className="py-16 text-center text-sm text-muted-foreground">Loading orders…</p> : !user ? (
          <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
            <PackageCheck className="mx-auto size-10 text-primary" />
            <h2 className="mt-5 font-serif text-2xl font-bold">Sign in to view your orders</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Your order history is available after you sign in.</p>
            <Button asChild className="mt-6"><Link href="/login">Sign in <ArrowRight /></Link></Button>
          </section>
        ) : order ? (
          <section className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div><p className="text-sm font-bold text-primary">Confirmed order</p><h2 className="mt-1 font-serif text-2xl font-bold">{order.orderId}</h2><p className="mt-2 text-sm text-muted-foreground">Placed {new Date(order.placedAt).toLocaleDateString('en-GB')}</p></div>
              <p className="font-serif text-2xl font-extrabold">{formatPrice(order.total)}</p>
            </div>
            <div className="mt-6 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-3"><div><p className="font-semibold text-muted-foreground">Items</p><p className="mt-1 font-bold">{order.itemCount}</p></div><div><p className="font-semibold text-muted-foreground">Business</p><p className="mt-1 font-bold">{order.delivery.businessName}</p></div><div><p className="font-semibold text-muted-foreground">Delivery</p><p className="mt-1 font-bold">{order.delivery.address}</p></div></div>
          </section>
        ) : (
          <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-border p-8 text-center"><PackageCheck className="mx-auto size-10 text-muted-foreground" /><h2 className="mt-5 font-serif text-2xl font-bold">No orders yet</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Your confirmed wholesale orders will appear here.</p><Button asChild className="mt-6"><Link href="/catalogue">Browse catalogue <ArrowRight /></Link></Button></section>
        )}
      </main>
    </div>
  )
}
