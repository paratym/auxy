import { createTheme } from "@vanilla-extract/css";

export type ContainerProperties = {
  color: {
    bg: string;
    fg: string;
  };
  gap: string;
  shadow: string;
  border: string;
};

export type Theme = {
  surface: {
    background: ContainerProperties;
    static: ContainerProperties;
    main: ContainerProperties;
  };
  interactive: {
    default: ContainerProperties;
    primary: Pick<ContainerProperties, "color" | "shadow">;
    active: Pick<ContainerProperties, "color" | "shadow">;
    inactive: Pick<ContainerProperties, "color" | "shadow">;
    disabled: Pick<ContainerProperties, "color" | "shadow">;
  };
  indicator: {
    default: {
      color: string;
      gap: string;
      border: string;
    };
    info0: string;
    info1: string;
    info2: string;
    info3: string;
    info4: string;
    info5: string;
    info6: string;
    info7: string;
    info8: string;
    info9: string;
    warning: string;
    error: string;
  };
  text: {
    title: {
      font: string;
      size: string;
      weight: string;
    };
    heading: {
      font: string;
      weight: string;
      sm: { size: string };
      md: Theme["text"]["heading"]["sm"];
      lg: Theme["text"]["heading"]["sm"];
    };
    body: Theme["text"]["title"];
    label: Theme["text"]["title"];
  };
};

export const [themeClass, theme] = createTheme<Theme>({
  surface: {
    background: {
      color: {
        bg: "#121212",
        fg: "#FFFFFF",
      },
      gap: "8px",
      shadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      border: "1px solid #333",
    },
    static: {
      color: {
        bg: "#212121",
        fg: "#FFFFFF",
      },
      gap: "8px",
      shadow: "none",
      border: "1px solid #444",
    },
    main: {
      color: {
        bg: "#1E1E1E",
        fg: "#FFFFFF",
      },
      gap: "8px",
      shadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      border: "1px solid #333",
    },
  },
  interactive: {
    default: {
      color: {
        bg: "#333",
        fg: "#FFFFFF",
      },
      gap: "8px",
      shadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      border: "1px solid #666",
    },
    primary: {
      color: {
        bg: "#2196F3",
        fg: "#FFFFFF",
      },
      shadow: "0 2px 4px rgba(33, 150, 243, 0.2)",
    },
    active: {
      color: {
        bg: "#4CAF50",
        fg: "#FFFFFF",
      },
      shadow: "0 2px 4px rgba(76, 175, 80, 0.2)",
    },
    inactive: {
      color: {
        bg: "#757575",
        fg: "#FFFFFF",
      },
      shadow: "none",
    },
    disabled: {
      color: {
        bg: "#BDBDBD",
        fg: "#FFFFFF",
      },
      shadow: "none",
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
      font: "Roboto, sans-serif",
      size: "24px",
      weight: "bold",
    },
    heading: {
      font: "Roboto, sans-serif",
      weight: "bold",
      sm: { size: "20px" },
      md: { size: "24px" },
      lg: { size: "28px" },
    },
    body: {
      font: "Roboto, sans-serif",
      size: "16px",
      weight: "normal",
    },
    label: {
      font: "Roboto, sans-serif",
      size: "14px",
      weight: "normal",
    },
  },
});