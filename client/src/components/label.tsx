import { JSX } from 'solid-js';
import { AbsoluteSize, Theme, theme } from '../theme.css';
import * as styles from './label.css';

export type LabelProps = {
	size?: AbsoluteSize;
	shade?: keyof Theme['colors']['foreground'];
	children: JSX.Element;
};

export function Label({ size = 'md', shade, children }: LabelProps) {
	return (
		<div class={styles.label[size]} style={{ color: shade ? theme.colors.foreground[shade] : undefined }}>
			{children}
		</div>
	);
}
