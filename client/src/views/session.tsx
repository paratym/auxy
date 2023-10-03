import * as styles from './session.css';
import { Handle, Label, LibraryObjectList, LibraryObjectOverlay, View } from '../components';
import { SessionControls } from '../components/session-controls';
import { useLocation, useNavigate } from '@solidjs/router';
import { Show, createSignal } from 'solid-js';
import { LibraryObject } from '../services';

export type SessionLocationState = {
	previous?: string;
};

export function SessionView() {
	const { state } = useLocation<SessionLocationState>();
	const navigate = useNavigate();
	const previous = typeof state?.previous === 'string' ? state.previous : '/home';

	const [expandedObject, expandObject] = createSignal<LibraryObject>();

	return (
		<>
			<View>
				<div class={styles.infoContainer}>
					<Label size='sm' shade={6}>
						16m / 2h 32m
					</Label>
					<Label size='sm' shade={6}>
						6 / 56 Tracks
					</Label>
				</div>

				<LibraryObjectList
					objects={Array<LibraryObject>(56).fill({ type: 'track', name: 'Track Title' })}
					onObjectExpand={(o) => expandObject(o)}
				/>

				<div class={styles.controlsContainer}>
					<Handle size='sm' direction='down' onclick={() => navigate(previous)} />
					<SessionControls />
				</div>
			</View>

			<Show when={expandedObject()}>
				{(object) => <LibraryObjectOverlay object={object()} onClose={() => expandObject(undefined)} />}
			</Show>
		</>
	);
}
