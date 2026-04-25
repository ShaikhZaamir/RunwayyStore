'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/products'
import { ChevronDown } from 'lucide-react'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState(300)
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory
    const priceMatch = product.price <= priceRange
    return categoryMatch && priceMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Shop</h1>
          <p className="text-muted-foreground mt-2">Browse our complete collection</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Category</h3>
                <div className="space-y-3">
                  {CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-foreground">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>$0</span>
                    <span>${priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
              <p className="text-muted-foreground">
                Showing {sortedProducts.length} products
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg text-foreground bg-background cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setPriceRange(300)
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
