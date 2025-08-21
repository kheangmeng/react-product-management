import type { ProductListResponse, ProductResponse } from "@/types";

export function mapProduct(res: any): ProductResponse {
  return {
    id: res.id,
    title: res.title,
    description: res.description,
    price: res.price,
    category: res.category,
    discountPercentage: res.discountPercentage,
    sku: res.sku,
    stock: res.stock,
    added: res.meta?.createdAt,
    variant: res.tags?.length || 1 ,
    thumbnail: res.thumbnail,
    images: res.images,
  }
}

export function mapProductList(res: any): ProductListResponse {
  const products = res.products?.map((product: ProductResponse) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    discountPercentage: product.discountPercentage,
    sku: product.sku,
    stock: product.stock,
    added: product.meta?.createdAt,
    variant: product.tags?.length || 1 ,
    thumbnail: product.thumbnail,
    images: product.images,
  }))

  return {
    products,
    total: res.total,
    skip: res.skip,
    limit: res.limit,
  }
}
