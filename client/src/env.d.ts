// tauri
interface Window {
	__TAURI__: unknown;
}

//assets
declare module '*.woff2' {
	export default string;
}
