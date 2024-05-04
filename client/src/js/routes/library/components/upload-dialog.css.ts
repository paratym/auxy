import { style } from "@vanilla-extract/css";
import { theme } from "../../../theme.css";

export const overlay = style({
  position: "absolute",
  inset: "0",
  background: theme.surface.background.bg,
  opacity: 0.6,
});

export const layout = style({
  position: "absolute",
  inset: "0",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
