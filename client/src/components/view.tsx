import { JSX } from 'solid-js';
import * as styles from './view.css';

export type ViewProps = JSX.HTMLElementTags['div'] & {};

export function View({ children, ...props }: ViewProps) {
	return (
		<div class={styles.view} {...props}>
			{children}
		</div>
	);
}
