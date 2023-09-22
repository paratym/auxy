import * as styles from './playback-controls.css';
import { ProgressBar } from '.';
import {
	IconPlayerSkipBack,
	IconPlayerPlay,
	IconPlayerSkipForward,
	IconPlus,
	TablerIconsProps,
	IconDeviceAirpods,
} from '@tabler/icons-solidjs';

const stateIconProps: TablerIconsProps = {
	// size: '1rem',
	// color: theme.colors.primary,
};

export function PlaybackContols() {
	return (
		<div class={styles.container}>
			<ProgressBar />
			<div class={styles.actionsContainer}>
				<button class={styles.stateButton}>
					<IconDeviceAirpods class={styles.stateIcon} {...stateIconProps} />
				</button>

				<button class={styles.actionButton}>
					<IconPlayerSkipBack />
				</button>

				<button class={styles.actionButton}>
					<IconPlayerPlay />
				</button>

				<button class={styles.actionButton}>
					<IconPlayerSkipForward />
				</button>

				<button class={styles.stateButton}>
					<IconPlus class={styles.stateIcon} {...stateIconProps} />
				</button>
			</div>
		</div>
	);
}
