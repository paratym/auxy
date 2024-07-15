import { styleVariants } from "@vanilla-extract/css";
import { SurfaceProps } from "./surface";
import { Theme, theme } from "../../theme";

function computedStyles(key: keyof Theme["surface"]) {
  return {
    background: theme.surface[key].bg,
    color: theme.surface[key].fg,
    gap: theme.surface[key].gap,
    boxShadow: theme.surface[key].gap,
    border: theme.surface[key].border,
  };
}

export const surface = styleVariants({
  background: {
    ...computedStyles("background"),
    width: "100%",
    height: "100%",
  },
  main: {
    ...computedStyles("main"),
  },
  static: {
    ...computedStyles("static"),
  },
  dynamic: {
    ...computedStyles("dynamic"),
  },
} satisfies Record<SurfaceProps["variant"], any>);
