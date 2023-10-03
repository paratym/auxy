import { JSX } from 'solid-js';
import { AbsoluteSize, Theme, theme } from '../theme.css';
import * as styles from './label.css';

export type LabelProps = {
	size?: AbsoluteSize;
	shade?: keyof Theme['colors']['foreground'];
	bold?: boolean;
	children: JSX.Element;
};

export function Label({ size = 'md', shade, bold, children }: LabelProps) {
	return (
		<h6
			class={styles.label[size]}
			style={{
				color: shade !== undefined ? theme.colors.foreground[shade] : undefined,
				'font-weight': bold ? 'bold' : 'unset',
			}}
		>
			{children}
		</h6>
	);
}
