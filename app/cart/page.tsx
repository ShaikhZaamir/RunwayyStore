'use client'

import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-provider'

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const subtotal = total
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.1
  const finalTotal = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg border border-border hover:border-primary/30 transition">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-secondary rounded-md overflow-hidden">
                    <Image
                      src={item.image  || '/placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-primary font-bold">₹{item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 border border-border rounded hover:bg-secondary transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-border rounded hover:bg-secondary transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition"
              >
                ← Continue Shopping
              </Link>
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-600 font-semibold hover:text-red-700 transition ml-auto"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-lg p-6 space-y-4 sticky top-20">
              <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-primary font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </button>

              <Link href="/shop" className="block w-full border border-border py-3 rounded-lg font-semibold hover:bg-secondary transition text-center">
                Continue Shopping
              </Link>

              {subtotal > 0 && subtotal <= 50 && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
                  <p className="text-foreground font-semibold">
                    Add ₹{(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
