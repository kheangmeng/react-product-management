import type { SelectCategoryData } from '@/types'
import { mapCategories } from './mapping'

const BASE_API = import.meta.env.VITE_BASE_API || 'https://dummyjson.com'

export async function getCategoryList(): Promise<SelectCategoryData[]> {
  const response = await fetch(
    `${BASE_API}/products/category-list`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response?.ok) {
    const data = await response.json()
    return mapCategories(data)
  }
  throw response
}
