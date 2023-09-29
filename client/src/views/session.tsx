import * as styles from './session.css';
import { Label, PlaybackContols, TrackList } from '../components';
import { SessionControls } from '../components/session-controls';
import { createSignal, onMount } from 'solid-js';
import { getBackgroundColor } from '../utils';

export function SessionView() {
	let layoutRef: HTMLDivElement | undefined;
	const [bgColor, setBgColor] = createSignal<string>('transparent');

	onMount(() => {
		const color = getBackgroundColor(layoutRef!);
		if (color) setBgColor(color);
	});

	return (
		<div ref={layoutRef} class={styles.layout}>
			<div class={styles.trackListContainer}>
				<div
					class={styles.infoContainer}
					style={{
						background: `linear-gradient(0deg, color-mix(in srgb, ${bgColor()} 40%, transparent) 0%, ${bgColor()} 80%)`,
					}}
				>
					<Label size='sm' shade={6}>
						16m / 2h 32m
					</Label>
					<Label size='sm' shade={6}>
						6 / 56 Tracks
					</Label>
				</div>
				<TrackList />
			</div>

			<div class={styles.controlsContainer}>
				<SessionControls />
				<PlaybackContols />
			</div>
		</div>
	);
}
