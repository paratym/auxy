import * as styles from './session.css';
import { Handle, Label, TrackList } from '../components';
import { SessionControls } from '../components/session-controls';
import { useLocation, useNavigate } from '@solidjs/router';

export type SessionLocationState = {
	previous?: string;
};

export function SessionView() {
	const { state } = useLocation<SessionLocationState>();
	const navigate = useNavigate();
	const previous = typeof state?.previous === 'string' ? state.previous : '/';

	return (
		<div class={styles.layout}>
			<div class={styles.infoContainer}>
				<Label size='sm' shade={6}>
					16m / 2h 32m
				</Label>
				<Label size='sm' shade={6}>
					6 / 56 Tracks
				</Label>
			</div>

			<TrackList />

			<div class={styles.controlsContainer}>
				<Handle size='sm' direction='down' onclick={() => navigate(previous)} />
				<SessionControls />
			</div>
		</div>
	);
}
