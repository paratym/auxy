import { defineConfig } from "@solidjs/start/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  appRoot: "./src",
  ssr: true,
  vite: {
    plugins: [tsconfigPaths(), vanillaExtractPlugin()],
    clearScreen: false,
    envDir: "./..",
    envPrefix: "PUBLIC_",
    // server: {
    // 	port: Number(process.env.DEV_CLIENT_SERVER_PORT),
    // 	strictPort: true,
    // 	host: true,
    // },
  },
  server: {
    preset: "static",
    // baseURL: process.env.PUBLIC_SERVER_CLIENT_PATH,
  },
});
