import { JSX, Match, Switch, mergeProps } from 'solid-js';
import { AbsoluteSize } from '../theme.css';
import * as styles from './handle.css';
import { IconChevronCompactDown, IconChevronCompactUp } from '@tabler/icons-solidjs';

export type HandleProps = JSX.HTMLAttributes<HTMLDivElement> & {
	direction?: 'up' | 'down' | 'neutral';
	size?: AbsoluteSize;
};

export function Handle(_props: HandleProps) {
	const props = mergeProps({ direction: 'neutral', size: 'md' } as const, _props);

	return (
		<div class={styles.container} {...props}>
			<Switch>
				<Match when={props.direction === 'up'}>
					<IconChevronCompactUp style={{ width: size[props.size] }} />
				</Match>

				<Match when={props.direction === 'neutral'}>
					<div class={styles.neutral} style={{ width: size[props.size] }} {...props} />
				</Match>

				<Match when={props.direction === 'down'}>
					<IconChevronCompactDown style={{ width: size[props.size] }} />
				</Match>
			</Switch>
		</div>
	);
}

const size = {
	xs: '2rem',
	sm: '2.6rem',
	md: '3.2rem',
	lg: '4.2rem',
	xl: '5rem',
};
