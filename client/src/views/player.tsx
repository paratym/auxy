import { SessionView } from '.';
import { CoverArt, Handle, Label, PlaybackContols, Title } from '../components';
import * as styles from './player.css';

export function PlayerView() {
	return (
		<div class={styles.layout}>
			<CoverArt releaseId='' />
			<div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: '#fff' }}>
				<Title size='sm'>Song title</Title>
				<Label>artist name</Label>
			</div>

			<PlaybackContols />

			<div class={styles.sessionCard}>
				<Handle />
				<SessionView />
			</div>
		</div>
	);
}
