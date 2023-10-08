import { For } from 'solid-js';
import * as styles from './library-object-list.css';
import { Button, LibraryObjectInfo, ScrollableList } from '.';
import { IconDots } from '@tabler/icons-solidjs';
import { LibraryObject } from '../services';

type LibraryObjectListProps = {
	objects: LibraryObject[];
	onObjectExpand?: (object: LibraryObject, i: number) => void;
};

export function LibraryObjectList(props: LibraryObjectListProps) {
	return (
		<ScrollableList withShades>
			<For each={props.objects}>
				{(object, i) => (
					<div class={styles.trackContainer}>
						<LibraryObjectInfo size='sm' object={object} />
						<Button variant='icon' onclick={() => props.onObjectExpand?.(object, i())}>
							<IconDots />
						</Button>
					</div>
				)}
			</For>
		</ScrollableList>
	);
}
