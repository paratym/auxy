import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'stretch',
	gap: theme.gap.md,
	padding: theme.gap.xs,
});

export const infoContainer = style({
	color: 'white',
	flexGrow: 1,
});
