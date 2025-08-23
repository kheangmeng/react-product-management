export interface ProductResponse {
  id: string | number
  added: Date
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  sku: string
  stock: number
  variant?: number
  thumbnail?: string
  images?: string[]
}
export interface ProductListResponse {
  products: ProductResponse[]
  total: number
  skip: number
  limit: number
}

export type ProductEdit = Partial<Omit<ProductResponse, 'variant' | 'thumbnail' | 'images' | 'added'>>

export type Product = Pick<ProductResponse,
  'title'
  | 'price'
  | 'description'
  | 'category'
  | 'discountPercentage'
  | 'sku'
  | 'stock'
  | 'variant'
  | 'thumbnail'
  | 'images'
>
