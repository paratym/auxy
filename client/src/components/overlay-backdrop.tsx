import { JSX } from 'solid-js';
import * as styles from './overlay-backdrop.css';
import { combineClasses } from '../utils';

export type OverlayBackdropProps = JSX.HTMLElementTags['div'] & {};

export function OverlayBackdrop(props: OverlayBackdropProps) {
	return <div {...props} class={combineClasses(props.class, styles.backdrop)} />;
}
