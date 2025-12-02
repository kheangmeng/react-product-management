import type { AuthenticatedUser } from '@/types'
import { mapUser } from './mapping'

const BASE_API = import.meta.env.VITE_BASE_API || 'https://dummyjson.com'

export async function getProfile(id: number | string): Promise<AuthenticatedUser> {
  const response = await fetch(`${BASE_API}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  if (response.ok) {
    return mapUser(data)
  }
  throw new Error(data.message)
}
