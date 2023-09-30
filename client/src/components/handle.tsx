import { JSX, Match, Switch } from 'solid-js';
import { AbsoluteSize } from '../theme.css';
import * as styles from './handle.css';
import { IconChevronCompactDown, IconChevronCompactUp } from '@tabler/icons-solidjs';

export type HandleProps = JSX.HTMLAttributes<HTMLDivElement> & {
	direction?: 'up' | 'down' | 'neutral';
	size?: AbsoluteSize;
};

export function Handle({ size = 'md', direction = 'neutral', ...props }: HandleProps) {
	return (
		<div class={styles.container} {...props}>
			<Switch>
				<Match when={direction === 'up'}>
					<IconChevronCompactUp class={`${styles.size[size]}`} viewBox='4 11 16 3' />
				</Match>

				<Match when={direction === 'neutral'}>
					<div class={`${styles.neutral} ${styles.size[size]}`} {...props} />
				</Match>

				<Match when={direction === 'down'}>
					<IconChevronCompactDown class={`${styles.size[size]}`} />
				</Match>
			</Switch>
		</div>
	);
}
