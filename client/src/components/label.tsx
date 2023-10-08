import { JSX } from 'solid-js';
import { AbsoluteSize, Theme, theme } from '../theme.css';
import * as styles from './label.css';

export type LabelProps = {
	size?: AbsoluteSize;
	shade?: keyof Theme['colors']['foreground'];
	bold?: boolean;
	children: JSX.Element;
};

export function Label(props: LabelProps) {
	return (
		<h6
			class={styles.label[props.size ?? 'md']}
			style={{
				color: props.shade !== undefined ? theme.colors.foreground[props.shade] : undefined,
				'font-weight': props.bold ? 'bold' : 'normal',
			}}
		>
			{props.children}
		</h6>
	);
}
