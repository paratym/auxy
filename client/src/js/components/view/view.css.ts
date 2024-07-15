import { style, styleVariants } from "@vanilla-extract/css";
import { ViewProps } from "./view";

const container = style({
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  maxHeight: "100%",
  overflow: "hidden",
});

export const layout = styleVariants({
  centered: [
    container,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  ],
} satisfies Record<NonNullable<ViewProps["layout"]>, any>);

export const main = style({});
