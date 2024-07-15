import { ComponentProps, mergeProps } from "solid-js";
import * as styles from "./form.css";

export type FormProps = ComponentProps<"form">;

const defaultProps = {
  class: styles.container,
  method: "post",
  enctype: "multipart/form-data",
} as const satisfies Partial<FormProps>;

export function Form(_props: FormProps) {
  const props = mergeProps(defaultProps, _props);
  return <form {...props} />;
}
