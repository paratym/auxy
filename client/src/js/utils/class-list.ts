export function classList(
  ...classes: Array<string | undefined | null | false | 0>
) {
  return classes.filter(Boolean).join(" ");
}
