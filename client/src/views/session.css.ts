import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const layout = style({
	width: '100%',
	height: '100%',
	maxHeight: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	paddingBottom: theme.gap.lg,
});

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
