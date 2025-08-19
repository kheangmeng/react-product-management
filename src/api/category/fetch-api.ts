import { mapCategories } from './mapping'

const BASE_API = import.meta.env.VITE_BASE_API

export async function getCategoryList(): Promise<string[]> {
  try {
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
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
