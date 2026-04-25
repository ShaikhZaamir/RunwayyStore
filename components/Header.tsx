'use client'

import Link from 'next/link'
import { Search, Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-provider'
import AnimatedCartIcon from './AnimatedCartIcon'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">Runwayy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary transition">
              Shop
            </Link>
            <a href="#" className="text-foreground hover:text-primary transition">
              About
            </a>
            <a href="#" className="text-foreground hover:text-primary transition">
              Contact
            </a>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex p-2 hover:bg-secondary rounded-md transition">
              <Search className="w-5 h-5" />
            </button>
            <AnimatedCartIcon itemCount={items.length} />
            {user ? (
              <Link href="/profile" className="p-2 hover:bg-secondary rounded-md transition flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">{user.name}</span>
              </Link>
            ) : (
              <Link href="/login" className="hidden sm:block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition font-semibold">
                Login
              </Link>
            )}
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-md transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-2 py-2 text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/shop" className="block px-2 py-2 text-foreground hover:text-primary transition">
              Shop
            </Link>
            <a href="#" className="block px-2 py-2 text-foreground hover:text-primary transition">
              About
            </a>
            <a href="#" className="block px-2 py-2 text-foreground hover:text-primary transition">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
