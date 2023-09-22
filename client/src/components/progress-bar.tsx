import { Label } from '.';
import * as styles from './progress-bar.css';

export function ProgressBar() {
	return (
		<div class={styles.container}>
			<div class={styles.track}>
				<div class={styles.progress}>
					<div class={styles.thumb} tabIndex={1} />
				</div>
			</div>
			<div class={styles.labelContainer}>
				<Label size='xs'>1:23</Label>
				<Label size='xs'>4:56</Label>
			</div>
		</div>
	);
}
