'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  orders: Order[]
}

export interface Order {
  id: string
  date: string
  total: number
  status: 'pending' | 'completed' | 'shipped'
  items: { name: string; quantity: number; price: number }[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - in real app, would validate against backend
    if (!email || !password) {
      throw new Error('Email and password required')
    }

    const mockUser: User = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email,
      orders: [
        {
          id: 'ORD-001',
          date: '2024-04-15',
          total: 299.99,
          status: 'completed',
          items: [
            { name: 'Classic Denim Jacket', quantity: 1, price: 149.99 },
            { name: 'White Cotton T-Shirt', quantity: 2, price: 75.00 },
          ],
        },
      ],
    }

    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    // Guest cart will remain in localStorage and sync on next cart page visit
  }

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error('All fields required')
    }

    const mockUser: User = {
      id: 'user_' + Date.now(),
      name,
      email,
      orders: [],
    }

    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = async (name: string) => {
    if (user) {
      const updated = { ...user, name }
      setUser(updated)
      localStorage.setItem('user', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (undefined === context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
