import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
        return new Response('Unauthorized', { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { status } = body

    const order = await prisma.order.update({
        where: { id },
        data: { status },
    })

    return Response.json(order)
}