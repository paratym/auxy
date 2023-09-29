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
	paddingBottom: theme.gap.sm,
	marginBottom: theme.gap.sm,
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
