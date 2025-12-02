import type { AuthenticatedUser } from "@/types";

export function mapUser(res: any): AuthenticatedUser {
  return {
    id: res.id,
    username: res.username,
    email: res.email,
    image: res.image,
    token: res.token,
  }
}
