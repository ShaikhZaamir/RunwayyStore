import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Truck, RotateCcw, Shield } from 'lucide-react'
import Image from 'next/image'
import MobileProductSlider from '@/components/MobileProductSlider'
import Footer from '@/components/Footer'

type Product = {
  id: string
  name: string
  price: number
  image?: string
  category?: string
}

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

export default async function Home() {
  const products: Product[] = await getProducts()
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-96 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=400&fit=crop"
            alt="Fashion hero"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Discover Your Style
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Premium fashion and apparel for the modern wardrobe
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Explore our curated collection of trending styles</p>
        </div>

        <div className="mb-8">
          {/* Mobile Slider */}
          <MobileProductSlider products={featuredProducts} />

          {/* Desktop Grid (unchanged) */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Free Shipping</h3>
              <p className="text-muted-foreground text-sm">On orders over ₹50</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Returns</h3>
              <p className="text-muted-foreground text-sm">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Secure Payment</h3>
              <p className="text-muted-foreground text-sm">100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to get special offers and be the first to know about new collections
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer  */}
      <Footer />
    </div>
  )
}
