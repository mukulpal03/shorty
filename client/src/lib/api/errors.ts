const STATUS_MESSAGES: Record<number, string> = {
  400: "The request was invalid. Please check your input.",
  401: "Your session has expired. Please sign in again.",
  403: "You don't have permission to do that.",
  404: "The requested resource was not found.",
  409: "That resource already exists.",
  429: "Too many requests. Please try again later.",
  500: "Something went wrong on our end. Please try again.",
}

export class ApiError extends Error {
  readonly status?: number
  readonly code?: string

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
  }

  get isUnauthorized() {
    return this.status === 401
  }

  get isNetworkError() {
    return this.code === "NETWORK_ERROR"
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.message) return error.message
    if (error.status && STATUS_MESSAGES[error.status]) {
      return STATUS_MESSAGES[error.status]
    }
  }

  if (error instanceof Error) {
    if (error.message === "Network Error") {
      return "Unable to connect. Check your internet connection."
    }
    return error.message
  }

  return "Something went wrong. Please try again."
}
