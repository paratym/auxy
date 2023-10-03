import { For, JSX, createSignal, onMount } from 'solid-js';
import * as styles from './library-object-list.css';
import { getBackgroundColor } from '../utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Button, LibraryObjectInfo } from '.';
import { IconDots } from '@tabler/icons-solidjs';
import { LibraryObject } from '../services';

type LibraryObjectListProps = JSX.HTMLAttributes<HTMLDivElement> & {
	objects: LibraryObject[];
	onObjectExpand?: (object: LibraryObject, i: number) => void;
};

export function LibraryObjectList({ objects, onObjectExpand, ...props }: LibraryObjectListProps) {
	let containerRef: HTMLDivElement | undefined;
	const [bgColor, setBgColor] = createSignal('transparent');

	onMount(() => {
		if (!containerRef) return;
		const color = getBackgroundColor(containerRef);
		if (color) setBgColor(color);
	});

	return (
		<div
			ref={containerRef}
			class={styles.container}
			style={assignInlineVars({ [styles.background]: bgColor() })}
			{...props}
		>
			<div class={styles.shade.top} />
			<For each={objects}>
				{(object, i) => (
					<div class={styles.trackContainer}>
						<LibraryObjectInfo size='sm' object={object} />
						<Button variant='icon' onclick={() => onObjectExpand?.(object, i())}>
							<IconDots />
						</Button>
					</div>
				)}
			</For>
			<div class={styles.shade.bottom} />
		</div>
	);
}
