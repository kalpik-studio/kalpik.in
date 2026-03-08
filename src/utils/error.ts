export function parseErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;

  if (error instanceof Error) return error.message;

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  if (typeof error === "object") {
    return JSON.stringify(error);
  }

  return String(error);
}
