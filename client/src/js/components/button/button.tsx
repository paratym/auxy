import { Theme } from "@/theme";
import * as styles from "./button.css";
import { ComponentProps, mergeProps } from "solid-js";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof Theme["interactive"];
};

const defaultProps = {
  variant: "default",
} as const satisfies Partial<ButtonProps>;

export function Button(_props: ButtonProps) {
  const props = mergeProps(
    defaultProps,
    {
      get variant() {
        if (_props.type === "submit") return "primary";
      },
    },
    _props,
  );

  return <button class={styles.button[props.variant]} {...props} />;
}
