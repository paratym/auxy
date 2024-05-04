import { Show, createUniqueId } from "solid-js";
import { Label } from "./text";
import { CreateSelectorProps, splitStructuredProps } from "../utils";

export type SingleLineInputProps = CreateSelectorProps<{
  default: "input";
  label: typeof Label;
}>;

export function Input(_props: SingleLineInputProps) {
  const [structuredProps] = splitStructuredProps(_props, []);
  const id = createUniqueId();

  return (
    <>
      <Show when={structuredProps.label?.children}>
        <Label for={id} {...structuredProps.label} />
      </Show>
      <input id={id} {...structuredProps.default} />
    </>
  );
}
