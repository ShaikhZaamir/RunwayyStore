'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type Product = {
    id: string
    name: string
    price: number
}

export default function AdminProductsPage() {
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const { data: session, status } = useSession()

    async function loadProducts() {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    async function handleCreate() {
        if (!name || !price) return

        await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                price: Number(price),
            }),
        })

        setName('')
        setPrice('')
        loadProducts()
    }

    if (status === 'loading') return <div>Loading...</div>

    if (!session || session.user.role !== 'admin') {
        return <div>Unauthorized</div>
    }

    return (
        <div>
            <h1>Admin Products</h1>

            <div>
                <input
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={handleCreate}>
                    Create
                </button>
            </div>

            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {editingId === p.id ? (
                            <>
                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <input
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                />
                                <button
                                    onClick={async () => {
                                        await fetch(`/api/products/${p.id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                name: editName,
                                                price: Number(editPrice),
                                            }),
                                        })
                                        setEditingId(null)
                                        loadProducts()
                                    }}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                {p.name} - ₹{p.price}
                                <button
                                    onClick={() => {
                                        setEditingId(p.id)
                                        setEditName(p.name)
                                        setEditPrice(String(p.price))
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={async () => {
                                        await fetch(`/api/products/${p.id}`, {
                                            method: 'DELETE',
                                        })
                                        loadProducts()
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}