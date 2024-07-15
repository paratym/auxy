import { ComponentProps, splitProps } from "solid-js";
import * as styles from "./surface.css";
import { classList } from "@/utils";

export type SurfaceProps = ComponentProps<"div"> & {
  variant: "background" | "static" | "dynamic" | "main";
};

export function Surface(_props: SurfaceProps) {
  const [props, htmlProps] = splitProps(_props, ["variant"]);

  return (
    <div
      {...htmlProps}
      class={classList(styles.surface[props.variant], htmlProps.class)}
    />
  );
}
