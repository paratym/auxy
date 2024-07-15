import { style } from "@vanilla-extract/css";

const container = style({
  position: "absolute",
  inset: 0,
});

export const overlay = style([
  container,
  {
    opacity: 0.8,
    backdropFilter: "blur(2px)", // TODO: add backdrop filter to theme
  },
]);

export const layout = style([
  container,
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
]);
