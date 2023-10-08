import { useLocation, useNavigate } from '@solidjs/router';
import { Button, LibraryObjectInfo } from '.';
import * as styles from './now-playing.css';
import { SessionLocationState } from '../views';
import { IconPlayerPause, IconVolume } from '@tabler/icons-solidjs';

export type NowPlayingProps = {};

export function NowPlaying(props: NowPlayingProps) {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div
			class={styles.container}
			onclick={() =>
				navigate('/session', {
					state: { previous: pathname } satisfies SessionLocationState,
				})
			}
		>
			<LibraryObjectInfo size='xs' object={{ type: 'track', name: 'Track Title' }} />

			<Button variant='icon'>
				<IconVolume />
			</Button>

			<Button variant='icon'>
				<IconPlayerPause />
			</Button>
		</div>
	);
}
