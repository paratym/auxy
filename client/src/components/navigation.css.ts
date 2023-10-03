import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	gap: theme.gap.md,
});

export const navContainer = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: `0 ${theme.gap.md}`,
});

export const navButton = style({
	all: 'unset',
});
