export type Theme = {
	surface: {
		default: {
			color: {
				bg: string;
				fg: string;
			};
			gap: string;
			shadow: string;
			border: string;
		};
		background: Theme["surface"]["default"];
		content: Theme["surface"]["default"];
		elevated: Theme["surface"]["default"];
	};
	interactive: {
		default: {
			color: {
				bg: string;
				fg: string;
			};
			shadow: string;
			border: string;
		};
		disabled: Theme["interactive"]["default"];
		inactive: Theme["interactive"]["default"];
		active: Theme["interactive"]["default"];
		main: Theme["interactive"]["default"];
	};
	text: {
		title: string;
		h1: string;
		h2: string;
		h3: string;
		body: string;
		bold: string;
		italic: string;
		label: string;
	};
	indicator: {};
};
