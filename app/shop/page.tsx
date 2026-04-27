import ShopClient from './ShopClient'

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

export default async function ShopPage() {
  const products = await getProducts()

  return <ShopClient products={products} />
}