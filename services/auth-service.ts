import type { AuthUser } from '@/types/order'

/** Simulated auth. No backend yet — validates against predefined mock users. */
interface MockAccount extends AuthUser {
  password: string
}

const accounts: MockAccount[] = [
  {
    id: 'usr_001',
    name: 'Vinay',
    email: 'orders@spicehouse.co.uk',
    business: 'The Spice House',
    password: 'wholesale123',
  },
]

export const demoCredentials = {
  email: 'orders@spicehouse.co.uk',
  password: 'wholesale123',
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class AuthError extends Error {}

export async function signInWithPassword(email: string, password: string): Promise<AuthUser> {
  await wait(600)
  const account = accounts.find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password,
  )
  if (!account) {
    throw new AuthError('That email and password combination is not recognised.')
  }
  const { password: _password, ...user } = account
  return user
}
