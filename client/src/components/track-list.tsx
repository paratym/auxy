import { For } from 'solid-js';
import { Track } from '.';
import * as styles from './track-list.css';

export function TrackList() {
	return (
		<div class={styles.container}>
			<For each={new Array(128)}>{() => <Track />}</For>
		</div>
	);
}
