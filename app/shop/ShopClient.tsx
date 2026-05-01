'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES } from '@/lib/products'
import { ChevronDown } from 'lucide-react'
import Footer from '@/components/Footer'

export default function ShopClient({ products }: { products: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [priceRange, setPriceRange] = useState(1000000)
    const [sortBy, setSortBy] = useState('featured')

    const [showFilters, setShowFilters] = useState(false)
    const [showSort, setShowSort] = useState(false)
    const [showBottomBar, setShowBottomBar] = useState(true)

    const filteredProducts = products.filter((product) => {
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
                return 0
            default:
                return 0
        }
    })

    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (Math.abs(currentScrollY - lastScrollY) < 10) return

            if (currentScrollY > lastScrollY) {
                setShowBottomBar(false)
            } else {
                setShowBottomBar(true)
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block lg:col-span-1">
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
                        <div className="hidden lg:flex justify-between items-center mb-6 pb-6 border-b border-border">
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
            {/* Mobile Bottom Bar */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-background border-t border-border p-3 flex justify-around items-center lg:hidden z-50 transition-transform duration-300 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <button
                    onClick={() => setShowFilters(true)}
                    className="flex-1 mx-1 py-2 rounded-full border border-border text-sm font-medium"
                >
                    Filters
                </button>

                <button
                    onClick={() => setShowSort(true)}
                    className="flex-1 mx-1 py-2 rounded-full border border-border text-sm font-medium"
                >
                    Sort
                </button>
            </div>
            {/* Mobile Filters Sheet */}
            {showFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowFilters(false)}
                    />

                    {/* Sheet */}
                    <div className="absolute bottom-0 left-0 w-full bg-background rounded-t-2xl p-6 overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Filters</h3>
                            <button onClick={() => setShowFilters(false)}>Close</button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold mb-3">Category</h4>
                            <div className="space-y-3">
                                {CATEGORIES.map((category) => (
                                    <label key={category} className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="category-mobile"
                                            value={category}
                                            checked={selectedCategory === category}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <h4 className="font-semibold mb-3">Price Range</h4>
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
            )}

            {/* Mobile Sort Sheet */}
            {showSort && (
                <div className="fixed inset-0 z-50 lg:hidden">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowSort(false)}
                    />

                    {/* Sheet */}
                    <div className="absolute bottom-0 left-0 w-full bg-background rounded-t-2xl p-6">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Sort By</h3>
                            <button onClick={() => setShowSort(false)}>Close</button>
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            {[
                                { label: 'Featured', value: 'featured' },
                                { label: 'Price: Low to High', value: 'price-low' },
                                { label: 'Price: High to Low', value: 'price-high' },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSortBy(option.value)
                                        setShowSort(false)
                                    }}
                                    className={`w-full text-left py-2 ${sortBy === option.value ? 'text-primary font-semibold' : ''
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}
