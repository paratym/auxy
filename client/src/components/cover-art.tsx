import { Size } from '../theme.css';
import * as styles from './cover-art.css';

type CoverArtProps = {
	releaseId: string;
	size?: Size;
};

const sizes: Partial<Record<Size, string>> = {
	sm: '64px',
	md: '128px',
	lg: '256px',
	full: '100%',
};

export function CoverArt({ releaseId, size = 'full' }: CoverArtProps) {
	return (
		<div class={styles.container} style={{ width: sizes[size] }}>
			<img
				class={styles.image}
				src='https://plus.unsplash.com/premium_photo-1686090449936-acfc6bc38f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
			/>
		</div>
	);
}
