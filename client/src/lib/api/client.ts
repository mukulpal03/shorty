import axios, { type AxiosRequestConfig } from "axios"

import { API_BASE_URL } from "@/constants/api"
import { ApiError } from "@/lib/api/errors"
import type { ApiErrorResponse } from "@/types/url"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred"
      return Promise.reject(new ApiError(message))
    }

    const status = error.response?.status
    const message =
      (error.response?.data as ApiErrorResponse | undefined)?.error ??
      error.message ??
      "An unexpected error occurred"

    return Promise.reject(new ApiError(message, status))
  },
)

export async function apiGet<T>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.get<T>(path, config)
  return data
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.post<T>(path, body, config)
  return data
}

export async function apiPut<T>(
  path: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.put<T>(path, body, config)
  return data
}

export async function apiDelete<T>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.delete<T>(path, config)
  return data
}
