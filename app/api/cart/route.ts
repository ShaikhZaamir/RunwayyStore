import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    })

    if (!cart) {
        return Response.json([])
    }

    // Transform into frontend format
    const items = cart.items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
    }))

    return Response.json(items)
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { productId, quantity } = body

    // 1. Get or create cart
    let cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
    })

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId: session.user.id,
            },
        })
    }

    // 2. Check if item exists
    const existing = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId,
            },
        },
    })

    if (existing) {
        await prisma.cartItem.update({
            where: { id: existing.id },
            data: {
                quantity: existing.quantity + quantity,
            },
        })
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            },
        })
    }

    return Response.json({ success: true })
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { productId, quantity } = body

    const cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
    })

    if (!cart) {
        return new Response('Cart not found', { status: 404 })
    }

    const existing = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId,
            },
        },
    })

    if (!existing) {
        return new Response('Item not found', { status: 404 })
    }

    if (quantity <= 0) {
        await prisma.cartItem.delete({
            where: { id: existing.id },
        })
    } else {
        await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity },
        })
    }

    return Response.json({ success: true })
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { productId } = body

    const cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
    })

    if (!cart) {
        return new Response('Cart not found', { status: 404 })
    }

    await prisma.cartItem.deleteMany({
        where: {
            cartId: cart.id,
            productId,
        },
    })

    return Response.json({ success: true })
}