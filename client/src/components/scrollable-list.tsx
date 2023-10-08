import { JSX, Show, createSignal, onMount } from 'solid-js';
import * as styles from './scrollable-list.css';
import { getBackgroundColor } from '../utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { AbsoluteSize, theme } from '../theme.css';

export type ScrollableListProps = JSX.HTMLElementTags['div'] & {
	gap?: AbsoluteSize;
	withShades?: boolean;
};

export function ScrollableList(props: ScrollableListProps) {
	let containerRef: HTMLDivElement | undefined;
	const [bgColor, setBgColor] = createSignal('transparent');

	onMount(() => {
		if (!containerRef) return;
		const color = getBackgroundColor(containerRef);
		if (color) setBgColor(color);
	});

	return (
		<div
			{...props}
			ref={containerRef}
			class={styles.container}
			style={{
				...assignInlineVars({ [styles.background]: bgColor() }),
				gap: props.gap ? theme.gap[props.gap] : undefined,
			}}
		>
			<Show when={props.withShades}>
				<div class={styles.shade.top} />
			</Show>

			{props.children}

			<Show when={props.withShades}>
				<div class={styles.shade.bottom} />
			</Show>
		</div>
	);
}
