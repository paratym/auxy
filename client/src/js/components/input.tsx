import {
  ComponentProps,
  Show,
  createUniqueId,
  mergeProps,
  splitProps,
} from "solid-js";
import { Label } from "./text";

export type InputProps = ComponentProps<"input"> & {
  label?: string;
};

export function Input(_props: InputProps) {
  const _defaultedProps = mergeProps({ id: createUniqueId() }, _props);
  const [props, htmlProps] = splitProps(_defaultedProps, ["label"]);

  return (
    <>
      <Show when={props.label}>
        <Label for={htmlProps.id}>{props.label}</Label>
      </Show>
      <input required {...htmlProps} />
    </>
  );
}
