import * as styles from './session.css';
import { Label, PlaybackContols, TrackList } from '../components';
import { SessionControls } from '../components/session-controls';

export function SessionView() {
	return (
		<div class={styles.layout}>
			<div class={styles.trackListContainer}>
				<div class={styles.infoContainer}>
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
