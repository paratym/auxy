import { Component, createSignal } from 'solid-js';

export function useOverlayManager<const TModals extends Record<string, Component<any>>>(modals: TModals) {
	type TProps<TKey extends keyof TModals> = TModals[TKey] extends Component<infer TProps> ? TProps : never;
	type TState<TKey extends keyof TModals> = [TKey, TProps<TKey>];

	const [currentOverlay, setCurrentOverlay] = createSignal<TState<keyof TModals>>();

	const openOverlay = <TKey extends keyof TModals>(key: TKey, props: TProps<TKey>) =>
		setCurrentOverlay((current) => (current ? current : [key, props]));

	const closeOverlay = () => setCurrentOverlay(undefined);

	return [currentOverlay, openOverlay, closeOverlay] as const;
}
