import { style } from "@vanilla-extract/css";
import { theme } from "../theme.css";

export const layout = style({
  width: "100%",
  height: "100%",
  display: "grid",
  gap: theme.surface.background.gap,
  background: theme.surface.background.color.bg,
});

export const overlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
