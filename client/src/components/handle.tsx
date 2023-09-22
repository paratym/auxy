import { AbsoluteSize } from '../theme.css';
import * as styles from './handle.css';

export type HandleProps = {
	size?: AbsoluteSize;
};

const sizes: Record<AbsoluteSize, string> = {
	xs: '2rem',
	sm: '2.6rem',
	md: '3.2rem',
	lg: '4.2rem',
	xl: '5rem',
};

export function Handle({ size = 'md' }: HandleProps) {
	return <div class={styles.handle} style={{ width: sizes[size] }} />;
}
