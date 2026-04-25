'use client'

import { ShoppingCart } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface AnimatedCartIconProps {
  itemCount: number
}

export default function AnimatedCartIcon({ itemCount }: AnimatedCartIconProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const prevCountRef = useRef(itemCount)

  useEffect(() => {
    if (itemCount > prevCountRef.current) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
    prevCountRef.current = itemCount
  }, [itemCount])

  return (
    <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-md transition group">
      <div className={`transition-transform duration-600 ${isAnimating ? 'animate-bounce scale-110' : ''}`}>
        <ShoppingCart className="w-5 h-5" />
      </div>
      {itemCount > 0 && (
        <span className={`absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center transition-all duration-300 ${isAnimating ? 'scale-125 animate-pulse' : 'scale-100'}`}>
          {itemCount}
        </span>
      )}
    </Link>
  )
}
