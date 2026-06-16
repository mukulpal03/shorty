import { apiGet } from "@/lib/api/client"

function authHeaders(token: string | null | undefined) {
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

export type MeResponse = {
  user: {
    _id: string
    clerkUserId: string
    email?: string
    firstName?: string
    lastName?: string
    imageUrl?: string
  }
}

export async function syncMe(token: string | null) {
  return apiGet<MeResponse>("api/users/me", { headers: authHeaders(token) })
}

