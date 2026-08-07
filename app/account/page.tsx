'use client'

import Link from 'next/link'
import { ArrowRight, LogOut, PackageCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PortalHeader } from '@/components/portal-header'
import { useAuth } from '@/components/providers'
import { Button } from '@/components/ui/button'

export default function AccountPage() {
  const router = useRouter()
  const { user, ready, signOut } = useAuth()
  if (!ready) return <div className="min-h-screen bg-background"><PortalHeader /><div className="mx-auto max-w-3xl px-5 py-20 text-center text-muted-foreground">Loading account…</div></div>
  if (!user) return <div className="min-h-screen bg-background"><PortalHeader /><main className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="font-serif text-4xl font-extrabold">Sign in to view your orders</h1><p className="mt-3 text-sm text-muted-foreground">Your account keeps your business details and order history together.</p><Button asChild className="mt-7"><Link href="/login">Sign in <ArrowRight /></Link></Button></main></div>
  return <div className="min-h-screen bg-background"><PortalHeader /><main className="mx-auto max-w-5xl px-5 py-10 lg:px-8"><div className="flex flex-col justify-between gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[.14em] text-primary">Your account</p><h1 className="mt-2 font-serif text-4xl font-extrabold">Hello, {user.name.split(' ')[0]}.</h1><p className="mt-2 text-sm text-muted-foreground">{user.business} · {user.email}</p></div><Button variant="outline" onClick={() => { signOut(); router.push('/') }}><LogOut /> Sign out</Button></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-border bg-card p-5"><PackageCheck className="size-6 text-primary" /><h2 className="mt-5 font-serif text-xl font-bold">Your orders</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Orders placed through the portal will appear here once connected to your account.</p><Button asChild variant="link" className="mt-4 px-0"><Link href="/catalogue">Start a new order <ArrowRight /></Link></Button></div><div className="rounded-2xl border border-border bg-card p-5"><p className="text-sm font-bold uppercase tracking-[.14em] text-primary">Business details</p><h2 className="mt-5 font-serif text-xl font-bold">{user.business}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{user.email}<br />Delivery details are collected with each order.</p><Button asChild variant="outline" className="mt-4"><Link href="/catalogue">Browse catalogue</Link></Button></div></div></main></div>
}
