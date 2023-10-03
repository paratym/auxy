import { CoverArt, Label, Title } from '.';
import { LibraryObject } from '../services';
import { AbsoluteSize, theme } from '../theme.css';
import * as styles from './library-object-info.css';
import { compareAbsoluteSize } from '../utils/compare-absolute-size';
import { Match, Switch } from 'solid-js';

export type LibraryObjectInfoProps = {
	size?: AbsoluteSize;
	orientation?: 'horizontal' | 'vertical';
	object: LibraryObject;
};

export function LibraryObjectInfo({ size = 'md', orientation = 'horizontal', object }: LibraryObjectInfoProps) {
	const largeOrLarger = compareAbsoluteSize(size, 'lg') >= 0;

	return (
		<div class={styles.container[orientation]} style={{ gap: layoutGap[size] }}>
			<CoverArt releaseId='' size={size} />
			<div class={styles.infoContainer[orientation]}>
				<Switch>
					<Match when={largeOrLarger}>
						<Title size={nameSize[size]}>{object.name}</Title>
					</Match>
					<Match when={!largeOrLarger}>
						<Label size={nameSize[size]} shade={6}>
							{object.name}
						</Label>
					</Match>
				</Switch>

				<Label size={infoSize[size]} shade={6}>
					Artist name
				</Label>
			</div>
		</div>
	);
}

const layoutGap: Record<AbsoluteSize, string> = {
	xs: theme.gap.xs,
	sm: theme.gap.xs,
	md: theme.gap.sm,
	lg: theme.gap.md,
	xl: theme.gap.md,
};

const nameSize: Record<AbsoluteSize, AbsoluteSize> = {
	xs: 'sm',
	sm: 'sm',
	md: 'md',
	lg: 'md',
	xl: 'md',
};

const infoSize: Record<AbsoluteSize, AbsoluteSize> = {
	xs: 'xs',
	sm: 'xs',
	md: 'sm',
	lg: 'sm',
	xl: 'md',
};
