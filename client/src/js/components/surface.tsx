import { Theme } from "../theme.css";
import { CreateSelectorProps, classList, splitStructuredProps } from "../utils";
import * as styles from "./surface.css";

export type SurfaceProps = CreateSelectorProps<
  {
    default: "div";
  },
  {
    variant: keyof Theme["surface"];
  }
>;

const defaultProps = {} as const satisfies Partial<SurfaceProps>;

export function Surface(_props: SurfaceProps) {
  const [structuredProps, props] = splitStructuredProps(_props);

  return (
    <div
      {...structuredProps.default}
      class={classList(structuredProps.default.class, styles.card)}
    />
  );
}
