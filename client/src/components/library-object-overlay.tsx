import * as styles from './library-object-overlay.css';
import { Handle, LibraryObjectInfo, OverlayBackdrop } from '.';
import { LibraryObject } from '../services';

export type LibraryObjectOverlayProps = {
	object: LibraryObject;
	onClose?: () => void;
};

export function LibraryObjectOverlay({ object, onClose }: LibraryObjectOverlayProps) {
	return (
		<OverlayBackdrop class={styles.backdrop}>
			<LibraryObjectInfo size='lg' orientation='vertical' object={object} />

			<div class={styles.actionsContainer}>
				<Handle direction='down' onclick={() => onClose?.()} />
			</div>
		</OverlayBackdrop>
	);
}
