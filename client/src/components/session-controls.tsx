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
import { Button, ProgressBar } from '.';

export type SessionControlsProps = {};

export function SessionControls(props: SessionControlsProps) {
	return (
		<div class={styles.container}>
			<div class={styles.actionsContainer}>
				<Button variant='icon' active>
					<IconRepeat />
				</Button>

				<Button variant='icon'>
					<IconArrowsShuffle />
				</Button>

				<Button variant='icon'>
					<IconSparkles />
				</Button>

				<Button variant='icon'>
					<IconBroadcast />
				</Button>
			</div>

			<ProgressBar />

			<div class={styles.actionsContainer}>
				<Button variant='icon'>
					<IconDeviceAirpods />
				</Button>

				<Button variant='icon'>
					<IconPlayerSkipBack />
				</Button>

				<Button variant='icon'>
					<IconPlayerPlay />
				</Button>

				<Button variant='icon'>
					<IconPlayerSkipForward />
				</Button>

				<Button variant='icon'>
					<IconPlus />
				</Button>
			</div>
		</div>
	);
}
