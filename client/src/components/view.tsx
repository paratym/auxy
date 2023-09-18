import * as styles from './view.css';
import { JSX } from 'solid-js';

export type ViewProps = {
	children?: JSX.Element;
};

export function View({ children }: ViewProps) {
	return <div class={styles.view}>{children}</div>;
}
