export interface ProductResponse {
  id: string
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  sku: string
  stock: number
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
