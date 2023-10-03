import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const layout = style({
	width: '100%',
	height: '100%',
	maxHeight: '100%',
	overflowY: 'auto',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
});

export const valuesContainer = style({
	display: 'flex',
	gap: theme.gap.md,
	flexWrap: 'wrap',
});
