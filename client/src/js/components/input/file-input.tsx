import { ComponentProps } from "solid-js";

export function FileInput(props: ComponentProps<"input">) {
  return <input type="file" {...props} />;
}
