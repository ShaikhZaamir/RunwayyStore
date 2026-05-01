'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-provider'

export default function AddToCartButton({ product }: { product: any }) {
    const { addItem } = useCart()
    const [qty, setQty] = useState(1)

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button
                onClick={() =>
                    addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: qty,
                        image: product.image || '/checked1.jpg',
                    })
                }
                className="bg-primary text-white px-6 py-3 rounded-lg"
            >
                Add to Cart
            </button>
        </div>
    )
}