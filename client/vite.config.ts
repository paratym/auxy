import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
	plugins: [solid(), vanillaExtractPlugin()],
	clearScreen: false,
	envDir: "./..",
	envPrefix: "PUBLIC_",
	server: {
		port: 1420,
		strictPort: true,
		host: true,
	},
});
