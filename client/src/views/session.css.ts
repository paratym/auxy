import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const infoContainer = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-around',
});

export const controlsContainer = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.gap.md,
});
