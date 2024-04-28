import { Show, createUniqueId } from "solid-js";
import { Label } from "./text";
import { PassthroughProps, splitPassthroughProps } from "../utils";

export type SingleLineInputProps = PassthroughProps<{
  default: "input";
  label: typeof Label;
}> & {};

export function Input(_props: SingleLineInputProps) {
  const [passthroughProps] = splitPassthroughProps(_props, []);
  const id = createUniqueId();

  return (
    <>
      <Show when={passthroughProps.$label.children}>
        <Label for={id} {...passthroughProps.$label} />
      </Show>
      <input id={id} {...passthroughProps.$default} />
    </>
  );
}
