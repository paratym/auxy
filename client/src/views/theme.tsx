import { Label } from '../components';
import * as styles from './theme.css';

export function ThemeView() {
	return (
		<div class={styles.layout}>
			<Label size='lg'>Colors</Label>
		</div>
	);
}
