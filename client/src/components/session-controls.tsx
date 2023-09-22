import { IconArrowsShuffle, IconBroadcast, IconRepeat, IconSparkles } from '@tabler/icons-solidjs';
import * as styles from './session-controls.css';

export type SessionControlsProps = {};

export function SessionControls({}: SessionControlsProps) {
	return (
		<div class={styles.container}>
			<button>
				<IconArrowsShuffle />
			</button>

			<button>
				<IconRepeat />
			</button>

			<button>
				<IconSparkles />
			</button>

			<button>
				<IconBroadcast />
			</button>
		</div>
	);
}
