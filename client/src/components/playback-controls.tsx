import * as styles from './playback-controls.css';
import { ProgressBar } from '.';
import {
	IconPlayerSkipBack,
	IconPlayerPlay,
	IconPlayerSkipForward,
	IconPlus,
	IconHeadphones,
} from '@tabler/icons-solidjs';

export function PlaybackContols() {
	return (
		<>
			<ProgressBar />
			<div class={styles.actionsContainer}>
				<button>
					<IconHeadphones />
				</button>

				<button>
					<IconPlayerSkipBack />
				</button>

				<button>
					<IconPlayerPlay />
				</button>

				<button>
					<IconPlayerSkipForward />
				</button>

				<button>
					<IconPlus />
				</button>
			</div>
		</>
	);
}
