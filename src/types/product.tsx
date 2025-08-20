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
}

export type Product = Pick<ProductResponse,
  'title'
  | 'price'
  | 'description'
  | 'category'
  | 'discountPercentage'
  | 'sku'
  | 'stock'
>
