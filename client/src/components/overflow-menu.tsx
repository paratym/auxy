import { IconDots } from '@tabler/icons-solidjs';
import * as styles from './overflow-menu.css';

export type OverflowMenuProps = {};

export function OverflowMenu({}: OverflowMenuProps) {
	return (
		<button class={styles.button}>
			<IconDots />
		</button>
	);
}
