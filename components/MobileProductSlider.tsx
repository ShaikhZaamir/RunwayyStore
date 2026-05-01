'use client'

import { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'

type Product = {
    id: string
    name: string
    price: number
    image?: string
    category?: string
}

export default function MobileProductSlider({ products }: { products: Product[] }) {
    const [activeIndex, setActiveIndex] = useState(0)

    const containerRef = useRef<HTMLDivElement>(null)
    const indexRef = useRef(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (!containerRef.current) return

            const container = containerRef.current
            const children = container.children

            if (children.length === 0) return

            indexRef.current = (indexRef.current + 1) % children.length
            setActiveIndex(indexRef.current)

            const child = children[indexRef.current] as HTMLElement

            container.scrollTo({
                left: child.offsetLeft,
                behavior: 'smooth',
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {/* Slider */}
            <div
                ref={containerRef}
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth sm:hidden scrollbar-hide"
            >
                {products.map((product: Product) => (
                    <div key={product.id} className="min-w-[80%] snap-start">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-2 sm:hidden">
                {products.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full transition ${index === activeIndex ? 'bg-primary' : 'bg-muted'
                            }`}
                    />
                ))}
            </div>
        </>
    )
}