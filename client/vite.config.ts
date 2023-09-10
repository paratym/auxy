import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(async () => ({
	plugins: [solidPlugin()],
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		host: '127.0.0.1',
		origin: 'http://127.0.0.1:1420',
	},
	envPrefix: ['VITE_', 'TAURI_'],
}));
