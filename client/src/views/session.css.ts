import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const layout = style({
	width: '100%',
	height: '100%',
	maxHeight: '100%',
	display: 'grid',
	gridTemplateRows: 'minmax(0, 1fr) auto',
	gap: theme.gap.md,
	paddingBottom: theme.gap.lg,
	overflow: 'hidden',
});

export const infoContainer = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-around',
	position: 'sticky',
	inset: 0,
	bottom: 'auto',
	padding: theme.gap.xs,
	background: `color-mix(in hsl, ${theme.colors.background[0]} 80%, transparent)`,
	backdropFilter: 'blur(2px)',
});

export const trackListContainer = style({
	width: '100%',
	position: 'relative',
	maxHeight: '100%',
	overflow: 'auto',
});

export const controlsContainer = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.gap.lg,
});
