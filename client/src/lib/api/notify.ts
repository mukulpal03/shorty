import { toast } from "sonner"

import { getErrorMessage } from "@/lib/api/errors"

export function notifyError(error: unknown, fallback = "Something went wrong") {
  toast.error(getErrorMessage(error) || fallback)
}

export function notifyWarning(message: string) {
  toast.warning(message)
}

export function notifySuccess(message: string) {
  toast.success(message)
}
