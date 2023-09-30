import { For, JSX, createSignal, onMount } from 'solid-js';
import { Track } from '.';
import * as styles from './track-list.css';
import { getBackgroundColor } from '../utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type TrackListProps = JSX.HTMLAttributes<HTMLDivElement>;

export function TrackList(props: TrackListProps) {
	let containerRef: HTMLDivElement | undefined;
	const [bgColor, setBgColor] = createSignal('transparent');

	onMount(() => {
		const color = getBackgroundColor(containerRef!);
		if (color) setBgColor(color);
	});

	return (
		<div
			ref={containerRef}
			class={styles.container}
			style={assignInlineVars({ [styles.background]: bgColor() })}
			{...props}
		>
			<div class={styles.shade.top} />
			<For each={new Array(128)}>{() => <Track />}</For>
			<div class={styles.shade.bottom} />
		</div>
	);
}
