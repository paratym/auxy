import { Component, Show, createSignal } from 'solid-js';

export function useOverlayManager<const TOverlays extends Record<string, Component<any>>>(overlays: TOverlays) {
	type TProps<TKey extends keyof TOverlays> = TOverlays[TKey] extends Component<infer TProps> ? TProps : never;
	type TState<TKey extends keyof TOverlays> = { key: TKey; props: TProps<TKey> } | undefined;

	const [currentOverlay, setCurrentOverlay] = createSignal<TState<keyof TOverlays>>();

	const openOverlay = <TKey extends keyof TOverlays>(key: TKey, props: TProps<TKey>) =>
		setCurrentOverlay((current) => (current ? current : { key, props }));

	const closeOverlay = () => setCurrentOverlay(undefined);

	const Overlay = () => {
		return (
			<Show when={currentOverlay()}>
				{(overlay) => {
					const { key, props } = overlay();
					return overlays[key](props);
				}}
			</Show>
		);
	};

	return [Overlay, openOverlay, closeOverlay] as const;
}
