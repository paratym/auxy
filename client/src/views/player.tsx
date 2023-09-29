import { SessionView } from '.';
import { CoverArt, Handle, Label, PlaybackContols, Title } from '../components';
import * as styles from './player.css';

export function PlayerView() {
	return (
		<div class={styles.layout}>
			<CoverArt releaseId='' />
			<div class={styles.trackInfoContainer}>
				<Title size='sm'>Song Tytle</Title>
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
