import { MapLeafNodes } from "@/utils";
import { createThemeContract } from "@vanilla-extract/css";

export type ContainerProperties = {
	bg: string;
	fg: string;
	gap: string;
	shadow?: string;
	border?: string;
};

export type Theme = {
	surface: {
		background: ContainerProperties;
		static: ContainerProperties;
		dynamic: ContainerProperties;
		main: ContainerProperties;
	};
	interactive: {
		default: ContainerProperties;
		primary: ContainerProperties;
		active: ContainerProperties;
		inactive: ContainerProperties;
		disabled: ContainerProperties;
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

const nullTheme: MapLeafNodes<Theme, null> = {
	surface: {
		background: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
		static: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
		dynamic: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
		main: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
	},
	interactive: {
		default: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
		primary: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
		active: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
		inactive: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
		disabled: {
			bg: null,
			fg: null,
			gap: null,
			shadow: null,
			border: null,
		},
	},
	indicator: {
		default: {
			color: null,
			gap: null,
			border: null,
		},
		info0: null,
		info1: null,
		info2: null,
		info3: null,
		info4: null,
		info5: null,
		info6: null,
		info7: null,
		info8: null,
		info9: null,
		warning: null,
		error: null,
	},
	text: {
		title: {
			font: null,
			size: null,
			weight: null,
		},
		heading: {
			font: null,
			weight: null,
			sm: {
				size: null,
			},
			md: {
				size: null,
			},
			lg: {
				size: null,
			},
		},
		body: {
			font: null,
			size: null,
			weight: null,
		},
		label: {
			font: null,
			size: null,
			weight: null,
		},
	},
};

export const theme = createThemeContract(nullTheme as Theme);
