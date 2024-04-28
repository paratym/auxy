import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  padding: 0,
  margin: 0,
});

globalStyle("html, body, #root", {
  width: "100vw",
  maxWidth: "100vw",
  height: "100vh",
  maxHeight: "100vh",
  overflow: "hidden",
});
