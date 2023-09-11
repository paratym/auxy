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
				<span>1:23</span>
				<span>4:56</span>
			</div>
		</div>
	);
}
