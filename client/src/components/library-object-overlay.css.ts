import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const layout = style({
	width: '100%',
	height: '100%',
	maxHeight: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'end',
	gap: theme.gap.lg,
});

export const actionsCard = style({
	width: '100%',
	height: 'auto',
	maxHeight: '100%',
	display: 'grid',
	gridTemplateRows: 'auto clamp(0, auto, 1fr)',
	backgroundColor: theme.colors.background[1],
	borderRadius: theme.radius.md,
	boxShadow: theme.shadow.md,
	overflow: 'hidden',
});

export const action = style({
	all: 'unset',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'flex-start',
	gap: theme.gap.md,
	padding: `${theme.gap.sm} ${theme.gap.md}`,
});
