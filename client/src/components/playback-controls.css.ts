import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: theme.gap.lg,
});

export const actionsContainer = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-around',
	color: theme.colors.foreground[0],
});

export const actionButton = style({
	all: 'unset',
});

export const stateButton = style({
	all: 'unset',
	width: '1.4rem',
	height: '1.4rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	border: `2px solid ${theme.colors.primary}`,
});

export const stateIcon = style({
	width: '1rem',
	color: theme.colors.primary,
	strokeWidth: '3px',
});
