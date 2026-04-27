'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { data: session } = useSession()

  // Load cart from localStorage on mount
  useEffect(() => {
    async function loadCart() {
      // Wait until session is known
      if (session === undefined) return

      // Logged in → fetch from DB
      if (session) {
        const res = await fetch('/api/cart')

        if (res.ok) {
          const data = await res.json()
          setItems(data)
        } else {
          setItems([])
        }
      } else {
        // Guest → localStorage
        const stored = localStorage.getItem('cart')
        if (stored) {
          setItems(JSON.parse(stored))
        } else {
          setItems([])
        }
      }
    }

    loadCart()
  }, [session])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = async (newItem: CartItem) => {
    // If logged in → sync with backend
    if (session) {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: newItem.id,
          quantity: newItem.quantity,
        }),
      })

      if (res.ok) {
        const cartRes = await fetch('/api/cart')
        if (cartRes.ok) {
          const data = await cartRes.json()
          setItems(data)
        }
      }

      return
    }

    // Guest → old logic
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id)
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...prev, newItem]
    })
  }

  const removeItem = async (id: string) => {
    // Logged in → backend
    if (session) {
      await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
        }),
      })

      // Reload
      const res = await fetch('/api/cart')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }

      return
    }

    // Guest → old logic
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = async (id: string, quantity: number) => {
    // Logged in → sync with backend
    if (session) {
      await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          quantity,
        }),
      })

      // Reload cart from DB
      const res = await fetch('/api/cart')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }

      return
    }

    // Guest → old logic
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = async () => {
    if (session) {
      // remove all items one by one
      for (const item of items) {
        await fetch('/api/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: item.id,
          }),
        })
      }

      setItems([])
      return
    }

    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (undefined === context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
