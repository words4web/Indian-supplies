'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PortalHeader } from '@/components/portal-header'
import { useAuth } from '@/components/providers'
import { demoCredentials, signInWithPassword } from '@/services/auth-service'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); setLoading(true); try { const user = await signInWithPassword(email, password); signIn(user); router.push('/account') } catch { setError('That email and password combination is not recognised.') } finally { setLoading(false) } }
  return <div className="min-h-screen bg-background"><PortalHeader /><main className="mx-auto grid max-w-5xl gap-10 px-5 py-12 md:grid-cols-[.9fr_1.1fr] md:items-center lg:px-8"><div><p className="text-sm font-bold uppercase tracking-[.14em] text-primary">Trade portal</p><h1 className="mt-3 font-serif text-5xl font-extrabold tracking-tight">Welcome back.</h1><p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">Sign in to see your previous orders and make your next wholesale order even faster.</p><div className="mt-8 rounded-2xl bg-secondary/60 p-5 text-sm leading-6 text-secondary-foreground"><p className="font-bold">Demo account</p><p className="mt-1">{demoCredentials.email}</p><p>{demoCredentials.password}</p></div></div><form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"><div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><LockKeyhole className="size-5" /></div><h2 className="mt-6 font-serif text-2xl font-bold">Sign in to your account</h2><div className="mt-7 space-y-5"><label className="block text-sm font-bold">Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-primary" required /></label><label className="block text-sm font-bold">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-primary" required /></label></div>{error && <p className="mt-5 rounded-xl bg-destructive/10 px-3 py-2.5 text-sm font-semibold text-destructive" role="alert">{error}</p>}<Button type="submit" className="mt-7 w-full" size="lg" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'} <ArrowRight /></Button><Link href="/" className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Back to home</Link></form></main></div>
}
