import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const backdrop = style({
	justifyContent: 'flex-end !important',
});

export const actionsContainer = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.gap.sm,
	padding: `${theme.gap.sm} ${theme.gap.md} 0`,
	backgroundColor: theme.colors.background[1],
	borderRadius: theme.radius.md,
	boxShadow: theme.shadow.md,
});
