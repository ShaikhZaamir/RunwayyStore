export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  reviews: number
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Silk Blouse',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=600&fit=crop',
    category: 'Tops',
    description: 'Luxurious silk blouse perfect for any occasion',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Classic Blue Jeans',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
    category: 'Bottoms',
    description: 'Timeless denim with perfect fit and comfort',
    rating: 4.6,
    reviews: 98,
  },
  {
    id: '3',
    name: 'Leather Jacket',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=600&fit=crop',
    category: 'Outerwear',
    description: 'Premium leather jacket for a bold statement',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Elegant Dress',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1595777712802-57569d4886cc?w=500&h=600&fit=crop',
    category: 'Dresses',
    description: 'Sophisticated dress for special events',
    rating: 4.7,
    reviews: 87,
  },
  {
    id: '5',
    name: 'Knit Sweater',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    category: 'Tops',
    description: 'Cozy and stylish knit sweater',
    rating: 4.5,
    reviews: 67,
  },
  {
    id: '6',
    name: 'Tailored Blazer',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1921bee0?w=500&h=600&fit=crop',
    category: 'Outerwear',
    description: 'Professional blazer for the modern wardrobe',
    rating: 4.8,
    reviews: 102,
  },
  {
    id: '7',
    name: 'Wide Leg Trousers',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1473922310424-629960f28b09?w=500&h=600&fit=crop',
    category: 'Bottoms',
    description: 'Contemporary wide leg trousers with elegant drape',
    rating: 4.6,
    reviews: 54,
  },
  {
    id: '8',
    name: 'Casual T-Shirt',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    category: 'Tops',
    description: 'Versatile cotton t-shirt for everyday wear',
    rating: 4.4,
    reviews: 203,
  },
]

export const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear']
