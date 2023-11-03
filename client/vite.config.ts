import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(async () => ({
	plugins: [vanillaExtractPlugin(), solidPlugin()],
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		host: true,
	},
	envDir: '.',
	envPrefix: 'PUBLIC_',
	assetsInclude: ['./assets/**/*', '**/*.woff2'],
}));
