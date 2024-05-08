import { ComponentProps } from "solid-js";
import * as styles from "./surface.css";

export type SurfaceProps = ComponentProps<"div"> & {
  variant: "background" | "static" | "dynamic" | "main";
};

export function Surface(props: SurfaceProps) {
  let ref;

  return <div ref={ref} class={styles.surface[props.variant]} {...props} />;
}
