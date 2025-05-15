import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export type Session = {
  user: {
    id: string
    email: string
    name: string | null
  } | null
}

export async function auth(): Promise<Session> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return { user: null }
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    })

    if (!user) {
      return { user: null }
    }

    return { user }
  } catch (error) {
    console.error('[AUTH_ERROR]', error)
    return { user: null }
  }
}

export async function getSession(): Promise<Session> {
  return auth()
}

export async function getCurrentUser() {
  const session = await auth()
  return session.user
} 