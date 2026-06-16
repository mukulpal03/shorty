import { API_ENDPOINTS } from "@/constants/api"
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
  return apiGet<MeResponse>(API_ENDPOINTS.me, { headers: authHeaders(token) })
}
