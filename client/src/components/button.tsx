import { JSX } from 'solid-js';
import * as styles from './button.css';

export type ButtonProps = JSX.HTMLElementTags['button'] & {
	variant: 'icon';
	active?: boolean;
};

export function Button({ variant, active, ...props }: ButtonProps) {
	return <button class={styles.iconButton} aria-checked={active} {...props} />;
}
