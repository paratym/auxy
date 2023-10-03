import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: theme.gap.md,
});

export const actionsContainer = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	padding: `0 ${theme.gap.md}`,
	color: theme.colors.foreground[0],
});
