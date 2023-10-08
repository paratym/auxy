import * as styles from './library-object-overlay.css';
import { Handle, Label, LibraryObjectInfo, OverlayBackdrop, ScrollableList } from '.';
import { LibraryObject } from '../services';
import { Component, For } from 'solid-js';
import {
	IconArrowsShuffle,
	IconDisc,
	IconPlus,
	IconRowInsertBottom,
	IconRowInsertTop,
	IconShare,
	IconSparkles,
	IconUser,
} from '@tabler/icons-solidjs';

type Action = {
	Icon: Component<{}>;
	label: string;
	callback: () => void;
};

export type LibraryObjectOverlayProps = {
	object: LibraryObject;
	actions?: Action[];
	onClose?: () => void;
};

export function LibraryObjectOverlay(props: LibraryObjectOverlayProps) {
	return (
		<OverlayBackdrop>
			<div class={styles.layout}>
				<LibraryObjectInfo size='xl' orientation='vertical' object={props.object} />

				<div class={styles.actionsCard}>
					<Handle direction='down' onclick={() => props.onClose?.()} />
					<ScrollableList withShades gap='xs'>
						<For each={[...objectActions[props.object.type], ...(props.actions ?? [])]}>
							{(action) => (
								<button class={styles.action} onclick={() => action.callback()}>
									<action.Icon />
									<Label>{action.label}</Label>
								</button>
							)}
						</For>
					</ScrollableList>
				</div>
			</div>
		</OverlayBackdrop>
	);
}

const globalActions: Action[] = [
	{ Icon: IconPlus, label: 'Add to library', callback: () => {} },
	{ Icon: IconShare, label: 'Share', callback: () => {} },
	{ Icon: IconSparkles, label: 'More like this', callback: () => {} },
];

const sessionActions: Action[] = [
	{ Icon: IconRowInsertBottom, label: 'Play next', callback: () => {} },
	{ Icon: IconArrowsShuffle, label: 'Shuffle into queue', callback: () => {} },
	{ Icon: IconRowInsertTop, label: 'Add to queue', callback: () => {} },
];

const navigationActions: Action[] = [
	{ Icon: IconUser, label: 'View artist', callback: () => {} },
	{ Icon: IconDisc, label: 'View release', callback: () => {} },
];

const objectActions: Record<LibraryObject['type'], Action[]> = {
	track: [...globalActions, ...sessionActions, ...navigationActions],
	release: [...globalActions, ...sessionActions, ...navigationActions],
	artist: [...globalActions],
};
