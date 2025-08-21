import type { Pagination, Product, ProductListResponse, ProductResponse } from '@/types'
import { mapProduct, mapProductList } from './mapping'

const BASE_API = import.meta.env.VITE_BASE_API || 'https://dummyjson.com'

export async function getProductList(pagination: Pagination): Promise<ProductListResponse> {
  const response = await fetch(
    `${BASE_API}/products?skip=${pagination.skip}&limit=${pagination.limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response?.ok) {
    const data = await response.json()
    return mapProductList(data)
  }
  throw response
}

export async function getProduct(id: number | string): Promise<ProductResponse> {
  const response = await fetch(`${BASE_API}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const data = await response.json()
    return mapProduct(data)
  }
  throw new Error(data.message)
}

export async function addProduct(product: Product): Promise<ProductResponse> {
  const res = await fetch(`${BASE_API}/products/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapProduct(product)),
  })
  const data = await res.json()
  if (res.ok) {
    return data
  }
  throw new Error(data.message)
}

export async function editProduct(id: number, product: Product): Promise<ProductResponse> {
  const res = await fetch(`${BASE_API}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapProduct(product)),
  })
  const data = await res.json()
  if (res.ok) {
    return data
  }
  throw new Error(data.message)
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE_API}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  if (res.ok) {
    return data
  }
  throw new Error(data.message)
}
