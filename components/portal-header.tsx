'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, ShoppingBasket, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth, useCart } from '@/components/providers'
import { Button } from '@/components/ui/button'

export function PortalHeader() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/orders', label: 'My orders' },
  ]

  return (
    <header className="border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Indian Supplies home">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-extrabold tracking-tight text-primary-foreground">IS</span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-base font-extrabold tracking-tight text-foreground">Indian Supplies</span>
            <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Wholesale food &amp; essentials</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${pathname === item.href ? 'bg-secondary text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/catalogue" aria-label="Search catalogue" className="hidden size-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground sm:flex"><Search className="size-[18px]" /></Link>
          <Link href={user ? '/account' : '/login'} className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground sm:flex"><UserRound className="size-4" />{user ? 'Account' : 'Sign in'}</Link>
          <Link href="/cart" className="relative flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5" aria-label={`Basket with ${itemCount} items`}><ShoppingBasket className="size-[18px]" />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-extrabold text-accent-foreground">{itemCount}</span>}</Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav className="border-t border-border/70 px-5 py-3 md:hidden" aria-label="Mobile navigation">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">{item.label}</Link>)}</nav>}
    </header>
  )
}
