import { mergeProps } from 'solid-js';
import { Label } from '.';
import { LibraryObject } from '../services';
import { AbsoluteSize, theme } from '../theme.css';
import * as styles from './library-object-info.css';

export type LibraryObjectInfoProps = {
	size?: AbsoluteSize;
	orientation?: 'horizontal' | 'vertical';
	object: LibraryObject;
};

export function LibraryObjectInfo(_props: LibraryObjectInfoProps) {
	const props = mergeProps({ size: 'md', orientation: 'horizontal' } as const, _props);

	return (
		<div class={styles.container[props.orientation]} style={{ gap: layoutGap[props.size] }}>
			<div class={styles.imageContainer[props.size]}>
				<img class={styles.image} />
			</div>

			<div class={styles.infoContainer[props.orientation]} style={{ gap: infoGap[props.size] }}>
				<Label size={nameSize[props.size]} bold>
					{props.object.name}
				</Label>
				<Label size={infoSize[props.size]} shade={4}>
					Artist name
				</Label>
			</div>
		</div>
	);
}

const layoutGap: Record<AbsoluteSize, string> = {
	xs: theme.gap.sm,
	sm: theme.gap.sm,
	md: theme.gap.sm,
	lg: theme.gap.md,
	xl: theme.gap.md,
};

const infoGap: Record<AbsoluteSize, string | undefined> = {
	xs: undefined,
	sm: undefined,
	md: undefined,
	lg: theme.gap.xs,
	xl: theme.gap.xs,
};

const nameSize: Record<AbsoluteSize, AbsoluteSize> = {
	xs: 'sm',
	sm: 'sm',
	md: 'md',
	lg: 'lg',
	xl: 'xl',
};

const infoSize: Record<AbsoluteSize, AbsoluteSize> = {
	xs: 'xs',
	sm: 'sm',
	md: 'sm',
	lg: 'md',
	xl: 'md',
};
