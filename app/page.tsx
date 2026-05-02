import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import MobileProductSlider from '@/components/MobileProductSlider'
import Footer from '@/components/Footer'
import Benefits from '@/components/Benefits'
import Newsletter from '@/components/Newsletter'

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

      <Benefits />

      <Newsletter />

      <Footer />
    </div>
  )
}
