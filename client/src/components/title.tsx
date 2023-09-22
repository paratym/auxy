import { JSX } from 'solid-js';
import * as styles from './title.css';
import { Dynamic } from 'solid-js/web';
import { AbsoluteSize } from '../theme.css';

export type TitleProps = {
	size?: AbsoluteSize;
	children: JSX.Element;
};

const componentMap: { [K in NonNullable<TitleProps['size']>]: keyof JSX.HTMLElementTags } = {
	xs: 'h4',
	sm: 'h3',
	md: 'h2',
	lg: 'h1',
	xl: 'h1',
};

export function Title({ size = 'md', children }: TitleProps) {
	return (
		<Dynamic component={componentMap[size]} class={styles.title[size]}>
			{children}
		</Dynamic>
	);
}
