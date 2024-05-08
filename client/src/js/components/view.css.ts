import { style, styleVariants } from "@vanilla-extract/css";
import { theme } from "../theme.css";
import { ViewProps } from "./view";
import * as surfaceStyles from "./surface.css";

export const layout = styleVariants({
  centered: [
    surfaceStyles.surface.background,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  ],
} satisfies Record<NonNullable<ViewProps["layout"]>, any>);

export const main = style({});
