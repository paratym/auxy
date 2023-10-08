import { JSX } from 'solid-js';
import * as styles from './button.css';

export type ButtonProps = JSX.HTMLElementTags['button'] & {
	variant: 'icon';
	active?: boolean;
};

export function Button(props: ButtonProps) {
	return <button class={styles.iconButton} aria-checked={props.active} {...props} />;
}
