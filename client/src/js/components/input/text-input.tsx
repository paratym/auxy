import { ComponentProps, Show, createUniqueId, mergeProps } from "solid-js";
import { Label } from "@/components";

export type TextInputProps = ComponentProps<"input">;

export function TextInput(_props: TextInputProps) {
  const props = mergeProps({ id: createUniqueId() }, _props);

  return (
    <>
      <Show when={props.name}>
        <Label for={props.id}>{props.name}</Label>
      </Show>
      <input required {...props} />
    </>
  );
}
