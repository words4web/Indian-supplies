'use client'

import { useParams } from 'next/navigation'
import catalogueData from '@/data/catalogue.json'
import { PortalHeader } from '@/components/portal-header'
import { ProductDetail } from '@/components/product-detail'
import type { Category } from '@/types/catalogue'

const products = (catalogueData as Category[]).flatMap(({ products: items }) => items)

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((item) => item.id === id)
  if (!product) return <div className="min-h-screen bg-background"><PortalHeader /><main className="mx-auto max-w-3xl px-5 py-20 text-center"><h1 className="font-serif text-3xl font-extrabold">Product not found</h1><p className="mt-3 text-muted-foreground">This item is not in the current catalogue.</p></main></div>
  return <><PortalHeader /><ProductDetail product={product} /></>
}
