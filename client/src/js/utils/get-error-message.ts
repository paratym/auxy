export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === "object") {
    if ("Message" in error && typeof error.Message === "string")
      return error.Message;
  }

  return "something went wrong";
}
