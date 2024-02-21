export function getErrorMessage(error: unknown): string {
  console.error(error);
  return "something went wrong";
}
