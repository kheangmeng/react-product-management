import type { Product, ProductResponse } from "@/types";

export function mapProduct(res: any): Product {
  return {
    title: res.title,
    description: res.description,
    price: res.price,
    category: res.category,
    discountPercentage: res.discountPercentage,
    sku: res.sku,
    stock: res.stock,
  }
}

export function mapProducts(res: any): ProductResponse[] {
  return res.products?.map((product: ProductResponse) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    discountPercentage: product.discountPercentage,
    sku: product.sku,
    stock: product.stock,
  }))
}
