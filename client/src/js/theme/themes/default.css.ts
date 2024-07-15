import { assignVars, fontFace, style } from "@vanilla-extract/css";
import { theme } from "../theme.css";

const bwNista = fontFace([
  {
    fontWeight: 400,
    src: [
      'local("BW Nista Geometric")',
      'local("BW Nista")',
      'url("/fonts/BwNistaGeo-Rg.woff2") format("woff2")',
    ],
  },
  {
    fontWeight: 800,
    src: [
      'local("BW Nista Geometric Bold")',
      'local("BW Nista Bold")',
      'url("/fonts/BwNistaGeo-Rg.woff2") format("woff2")',
    ],
  },
]);

export const defaultPlatformTheme = style({
  vars: assignVars(theme, {
    surface: {
      background: {
        bg: "#121212",
        fg: "#FFFFFF",
        gap: "8px",
        shadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        border: "1px solid #333",
      },
      static: {
        bg: "#212121",
        fg: "#FFFFFF",
        gap: "8px",
        shadow: "none",
        border: "1px solid #444",
      },
      dynamic: {
        bg: "#212121",
        fg: "#FFFFFF",
        gap: "8px",
        shadow: "none",
        border: "1px solid #444",
      },
      main: {
        bg: "#1E1E1E",
        fg: "#FFFFFF",
        gap: "8px",
        shadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        border: "1px solid #333",
      },
    },
    interactive: {
      default: {
        bg: "#333",
        fg: "#FFFFFF",
        gap: "8px",
        shadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        border: "1px solid #666",
      },
      primary: {
        bg: "#2196F3",
        fg: "#FFFFFF",
        shadow: "0 2px 4px rgba(33, 150, 243, 0.2)",
        border: "",
        gap: "",
      },
      active: {
        bg: "#4CAF50",
        fg: "#FFFFFF",
        shadow: "0 2px 4px rgba(76, 175, 80, 0.2)",
        border: "",
        gap: "",
      },
      inactive: {
        bg: "#757575",
        fg: "#FFFFFF",
        shadow: "none",
        border: "",
        gap: "",
      },
      disabled: {
        bg: "#BDBDBD",
        fg: "#FFFFFF",
        shadow: "none",
        border: "",
        gap: "",
      },
    },
    indicator: {
      default: {
        color: "#FF5722",
        gap: "4px",
        border: "1px solid #FF5722",
      },
      info0: "#03A9F4",
      info1: "#039BE5",
      info2: "#0288D1",
      info3: "#0277BD",
      info4: "#01579B",
      info5: "#0277BD",
      info6: "#01579B",
      info7: "#01579B",
      info8: "#01579B",
      info9: "#01579B",
      warning: "#FFC107",
      error: "#F44336",
    },
    text: {
      title: {
        font: `${bwNista}, sans-serif`,
        size: "24px",
        weight: "bold",
      },
      heading: {
        font: `${bwNista}, sans-serif`,
        weight: "bold",
        sm: { size: "20px" },
        md: { size: "24px" },
        lg: { size: "28px" },
      },
      body: {
        font: `${bwNista}, sans-serif`,
        size: "16px",
        weight: "normal",
      },
      label: {
        font: `${bwNista}, sans-serif`,
        size: "14px",
        weight: "normal",
      },
    },
  }),
  "@media": {
    "(prefers-color-scheme: light)": {
      // TODO
    },
  },
});
