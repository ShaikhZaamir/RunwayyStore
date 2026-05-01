'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type Order = {
    id: string
    total: number
    status: string
    name: string
    createdAt: string
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const { data: session, status } = useSession()

    async function loadOrders() {
        const res = await fetch('/api/orders')
        const data = await res.json()
        setOrders(data)
    }

    useEffect(() => {
        loadOrders()
    }, [])

    if (status === 'loading') return <div>Loading...</div>

    if (!session || session.user.role !== 'admin') {
        return <div>Unauthorized</div>
    }

    return (
        <div>
            <h1>Admin Orders</h1>

            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <div>
                            <strong>{order.name}</strong> — ₹{order.total}
                        </div>

                        <div>Status: {order.status}</div>

                        <div>
                            <select
                                value={order.status}
                                onChange={async (e) => {
                                    await fetch(`/api/orders/${order.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            status: e.target.value,
                                        }),
                                    })

                                    loadOrders()
                                }}
                            >
                                <option value="pending">pending</option>
                                <option value="paid">paid</option>
                                <option value="shipped">shipped</option>
                                <option value="delivered">delivered</option>
                            </select>
                        </div>

                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    )
}