import { IconDots } from '@tabler/icons-solidjs';
import { CoverArt, Label } from '.';
import * as styles from './track.css';

export function Track() {
	return (
		<div class={styles.container}>
			<CoverArt releaseId='' size='sm' />
			<div class={styles.infoContainer}>
				<Label size='sm' shade={0} bold>
					Track title
				</Label>
				<Label size='xs' shade={4}>
					Artist name
				</Label>
			</div>
			<button>
				<IconDots />
			</button>
		</div>
	);
}
