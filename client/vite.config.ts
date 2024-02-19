import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import stylex from "vite-plugin-stylex";

export default defineConfig({
	plugins: [solid(), stylex()],
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		host: true,
	},
});
