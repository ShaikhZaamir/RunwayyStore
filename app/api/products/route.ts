import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })

        return Response.json(
            products.map((p) => ({
                ...p,
                price: Number(p.price),
            }))
        )
    } catch (error) {
        return new Response('Error fetching products', { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
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

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
                category,
            },
        })

        return Response.json({
            ...product,
            price: Number(product.price),
        })
    } catch (error) {
        console.error(error)
        return new Response('Error creating product', { status: 500 })
    }
}