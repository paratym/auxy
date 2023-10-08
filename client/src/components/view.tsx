import { JSX, Show, splitProps } from 'solid-js';
import * as styles from './view.css';
import { useSession } from '../utils';
import { Navigate } from '@solidjs/router';

export type ViewProps = JSX.HTMLElementTags['div'] & {
	authed?: boolean;
};

export function View(props: ViewProps) {
	const [viewProps, divProps] = splitProps(props, ['authed']);
	const session = useSession();

	return (
		<Show when={viewProps.authed ? Boolean(session) : true} fallback={<Navigate href='/signin' />}>
			<div class={styles.view} {...divProps} />
		</Show>
	);
}
