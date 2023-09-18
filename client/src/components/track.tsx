import { IconDots } from '@tabler/icons-solidjs';
import { CoverArt } from '.';
import * as styles from './track.css';

export function Track() {
	return (
		<div class={styles.container}>
			<CoverArt releaseId='' />
			<div class={styles.infoContainer}>
				<h3>Track Title</h3>
				<span>Artist Name</span>
			</div>
			<button>
				<IconDots />
			</button>
		</div>
	);
}
