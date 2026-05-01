import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    // 1. Get cart
    const cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
            items: {
                include: { product: true },
            },
        },
    })

    if (!cart || cart.items.length === 0) {
        return new Response('Cart is empty', { status: 400 })
    }

    // 2. Calculate total
    const total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )

    // 3. Create order
    const order = await prisma.order.create({
        data: {
            userId: session.user.id,
            total,

            // ✅ real checkout data
            name: body.name,
            address: body.address,
            city: body.city,
            postal: body.postal,
            country: body.country,

            items: {
                create: cart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
            },
        },
    })

    // 4. Clear cart
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    })

    return Response.json(order)
}

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
        return new Response('Unauthorized', { status: 401 })
    }

    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return Response.json(orders)
}