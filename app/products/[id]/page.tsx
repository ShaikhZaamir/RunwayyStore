'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/products'
import { ShoppingCart, Heart, Share2, Star, Truck, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/lib/cart-provider'

export default function ProductDetail() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const product = MOCK_PRODUCTS.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <a href="/shop" className="text-primary font-semibold hover:underline">
            Back to shop
          </a>
        </div>
      </div>
    )
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <a href="/shop" className="text-primary font-semibold mb-6 inline-block hover:underline">
          ← Back to shop
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative h-96 md:h-full min-h-96 bg-secondary rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div>
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <p className="text-foreground leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Size</label>
              <div className="flex gap-3">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    className="w-10 h-10 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition font-medium"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-secondary transition"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-secondary transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.image,
                  })
                }}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 rounded-lg border transition ${
                  isWishlisted
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-lg border border-border hover:bg-secondary transition">
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Free Shipping</p>
                  <p className="text-muted-foreground text-sm">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Easy Returns</p>
                  <p className="text-muted-foreground text-sm">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  )
}
