import { ConflictError, NotFoundError } from "./AppError";

export function assertFound<T>(result: T | null, notFoundMessage: string): T {
  if (result === null) {
    throw new NotFoundError(notFoundMessage);
  }
  return result;
}

export function rethrowMongoError(error: unknown): never {
  if (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    error.code === 11000
  ) {
    throw new ConflictError("Resource already exists", "DUPLICATE_KEY");
  }

  throw error;
}
