import { JSX } from 'solid-js';
import * as styles from './overlay-backdrop.css';

export type OverlayBackdropProps = JSX.HTMLElementTags['div'] & {};

export function OverlayBackdrop(props: OverlayBackdropProps) {
	return <div class={styles.backdrop} {...props} />;
}
