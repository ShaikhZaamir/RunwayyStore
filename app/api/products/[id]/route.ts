import { prisma } from '@/lib/prisma'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


// FETCH PRODUCT
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const product = await prisma.product.findUnique({
            where: { id },
        })

        if (!product) {
            return new Response('Product not found', { status: 404 })
        }

        return Response.json({
            ...product,
            price: Number(product.price),
        })
    } catch (error) {
        console.error(error)
        return new Response('Error fetching product', { status: 500 })
    }
}


// UPDATE PRODUCT
export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {

    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
        const { id } = await context.params
        const body = await req.json()

        const { name, description, price, image, category } = body

        if (
            !name ||
            typeof name !== 'string' ||
            name.trim().length < 2 ||
            typeof price !== 'number' ||
            price <= 0
        ) {
            return new Response('Invalid input', { status: 400 })
        }

        const updated = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                image,
                category,
            },
        })

        return Response.json({
            ...updated,
            price: Number(updated.price),
        })
    } catch (error) {
        console.error(error)
        return new Response('Error updating product', { status: 500 })
    }
}


// DELETE PRODUCT
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {

    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
        return new Response('Unauthorized', { status: 401 })
    }
    
    try {
        const { id } = await context.params

        await prisma.product.delete({
            where: { id },
        })

        return new Response('Product deleted', { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response('Error deleting product', { status: 500 })
    }
}