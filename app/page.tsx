'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, Clock3, ShieldCheck, Truck } from 'lucide-react'
import catalogueData from '@/data/catalogue.json'
import { PortalHeader } from '@/components/portal-header'
import { ProductGrid } from '@/components/product-card'
import { CategoryVisual } from '@/components/product-visual'
import { Button } from '@/components/ui/button'
import type { Category } from '@/types/catalogue'

const catalogue = catalogueData as Category[]
const categories = catalogue.map(({ id, name, products }) => ({ id, name, productCount: products.length }))
const products = catalogue.flatMap(({ products: items }) => items)
const featured = products.filter((product) => product.price !== null).slice(0, 8)

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main>
        <section className="border-b border-border/70 bg-secondary/40"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-20"><div className="max-w-2xl"><p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/60 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-accent-foreground"><span className="size-1.5 rounded-full bg-primary" /> Trusted wholesale partner</p><h1 className="text-balance font-serif text-5xl font-extrabold tracking-[-.04em] text-foreground md:text-7xl">Your stockroom, <span className="text-primary">sorted.</span></h1><p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">Browse our complete Indian food and household essentials catalogue. Order by pack, tell us where to deliver, and we&apos;ll handle the rest.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link href="/catalogue">Browse catalogue <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/login">Sign in to order</Link></Button></div><div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground"><span className="inline-flex items-center gap-2"><Truck className="size-4 text-primary" /> Reliable delivery</span><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Trade pricing</span></div></div><div className="relative rounded-[2rem] bg-primary p-7 text-primary-foreground shadow-xl shadow-primary/15 md:p-10"><p className="text-sm font-bold uppercase tracking-[.16em] text-primary-foreground/70">One portal. Every staple.</p><p className="mt-14 max-w-sm font-serif text-4xl font-extrabold leading-tight md:text-5xl">From pantry basics to business essentials.</p><div className="mt-14 flex items-center justify-between border-t border-primary-foreground/20 pt-5"><span className="text-sm text-primary-foreground/75">{categories.length} categories</span><span className="text-sm text-primary-foreground/75">{products.length}+ products</span></div></div></div></section>
        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.14em] text-primary">Shop by need</p><h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight">Browse categories</h2></div><Link href="/catalogue" className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:flex">View all <ChevronRight className="size-4" /></Link></div><div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">{categories.slice(0, 8).map((category, index) => <Link key={category.id} href={`/catalogue?category=${category.id}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"><CategoryVisual category={category} index={index} /><span className="min-w-0"><span className="block truncate text-sm font-bold">{category.name}</span><span className="mt-1 block text-xs text-muted-foreground">{category.productCount} items</span></span></Link>)}</div></section>
        <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8"><div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.14em] text-primary">Ready to order</p><h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight">Popular wholesale picks</h2></div></div><ProductGrid products={featured} /></section>
        <section className="border-t border-border/70 bg-card"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 lg:px-8"><div className="flex gap-3"><Truck className="mt-1 size-5 text-primary" /><div><p className="font-bold">Delivery arranged</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Share your address at checkout and we&apos;ll confirm a delivery slot.</p></div></div><div className="flex gap-3"><Clock3 className="mt-1 size-5 text-primary" /><div><p className="font-bold">Quick responses</p><p className="mt-1 text-sm leading-6 text-muted-foreground">We&apos;ll review your order and get back to you promptly.</p></div></div><div className="flex gap-3"><ShieldCheck className="mt-1 size-5 text-primary" /><div><p className="font-bold">Built for trade</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Clear pack sizes and simple reordering for your business.</p></div></div></div></section>
      </main>
    </div>
  )
}
