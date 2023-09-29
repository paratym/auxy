import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const layout = style({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: theme.gap.lg,
});

export const trackInfoContainer = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.gap.xs,
});

export const sessionCard = style({
	width: '100%',
	height: '100%',
	marginTop: theme.gap.lg,
	padding: theme.gap.md,
	paddingTop: theme.gap.sm,
	paddingBottom: 'revert',
	gap: theme.gap.md,
	backgroundColor: theme.colors.background[1],
	borderRadius: theme.radius.md,
	boxShadow: theme.shadows.md,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});
