'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-provider'

type Product = {
  id: string
  name: string
  price: number
  image?: string
  category?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || '/placeholder.png',
    })
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer h-full">

        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden bg-secondary">
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          <button
            className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {product.category && (
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              {product.category}
            </p>
          )}

          <h3 className="font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>

          <p className="text-lg font-bold text-primary">
            ₹{product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}