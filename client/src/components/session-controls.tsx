import {
	IconArrowsShuffle,
	IconBroadcast,
	IconDeviceAirpods,
	IconPlayerPlay,
	IconPlayerSkipBack,
	IconPlayerSkipForward,
	IconPlus,
	IconRepeat,
	IconSparkles,
} from '@tabler/icons-solidjs';
import * as styles from './session-controls.css';
import { ProgressBar } from '.';

export type SessionControlsProps = {};

export function SessionControls({}: SessionControlsProps) {
	return (
		<div class={styles.container}>
			<div class={styles.actionsContainer}>
				<button class={styles.buttonActive}>
					<IconRepeat />
				</button>

				<button class={styles.button}>
					<IconArrowsShuffle />
				</button>

				<button class={styles.button}>
					<IconSparkles />
				</button>

				<button class={styles.buttonActive}>
					<IconBroadcast />
				</button>
			</div>

			<ProgressBar />

			<div class={styles.actionsContainer}>
				<button class={styles.buttonActive}>
					<IconDeviceAirpods />
				</button>

				<button class={styles.button}>
					<IconPlayerSkipBack />
				</button>

				<button class={styles.button}>
					<IconPlayerPlay />
				</button>

				<button class={styles.button}>
					<IconPlayerSkipForward />
				</button>

				<button class={styles.button}>
					<IconPlus />
				</button>
			</div>
		</div>
	);
}
