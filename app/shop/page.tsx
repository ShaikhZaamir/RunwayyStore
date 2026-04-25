import { prisma } from '@/lib/prisma'
import ShopClient from './ShopClient'

export default async function ShopPage() {
  const products = await prisma.product.findMany()

  return <ShopClient products={products} />
}