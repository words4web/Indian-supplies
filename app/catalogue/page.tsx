'use client'

import Link from 'next/link'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import catalogueData from '@/data/catalogue.json'
import { PortalHeader } from '@/components/portal-header'
import { EmptyProducts, ProductGrid } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import type { Category } from '@/types/catalogue'

const catalogue = catalogueData as Category[]
const categories = catalogue.map(({ id, name, products }) => ({ id, name, count: products.length }))
const products = catalogue.flatMap(({ products: items }) => items)

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [query, setQuery] = useState('')
  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory
      const searchable = `${product.name} ${product.pack ?? ''} ${product.categoryName}`.toLowerCase()
      return matchesCategory && (!term || searchable.includes(term))
    })
  }, [query, selectedCategory])

  function selectCategory(categoryId: string) {
    setSelectedCategory(categoryId)
    setQuery('')
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-border/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">Indian Supplies</p>
            <h1 className="mt-2 font-serif text-4xl font-extrabold tracking-tight">Wholesale catalogue</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Find the right pack for your shelves. Browse by category or search the full list.</p>
          </div>
          <Button asChild variant="outline"><Link href="/cart">View basket</Link></Button>
        </div>

        <div className="mt-7 flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, packs, or categories"
              className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-12 text-base shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Search products"
            />
            {query && <button type="button" onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary hover:underline">Clear</button>}
          </div>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1" aria-label="Product categories">
              <button type="button" onClick={() => selectCategory('all')} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'}`}>All products</button>
              {categories.map((category) => <button key={category.id} type="button" onClick={() => selectCategory(category.id)} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'}`}>{category.name} <span className="ml-1 opacity-60">{category.count}</span></button>)}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground">{filteredProducts.length} products</p>
          {selectedCategory !== 'all' && <button type="button" className="text-sm font-bold text-primary hover:underline" onClick={() => selectCategory('all')}>Show all products</button>}
        </div>
        <div className="mt-4">{filteredProducts.length ? <ProductGrid products={filteredProducts} /> : <EmptyProducts query={query} />}</div>
      </main>
    </div>
  )
}
