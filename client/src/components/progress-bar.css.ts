import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	width: '100%',
	maxWidth: '100%',
});

export const labelContainer = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	padding: '6px 6px 0',
	color: theme.colors.foreground[0],
});

export const track = style({
	width: '100%',
	height: '6px',
	borderRadius: '3px',
	backgroundColor: theme.colors.foreground[3],
});

export const progress = style({
	height: '100%',
	width: '50%',
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	borderRadius: '3px',
	backgroundColor: theme.colors.primary,
});

export const thumb = style({
	width: '16px',
	height: '16px',
	position: 'absolute',
	inset: 'auto',
	right: '-8px',
	borderRadius: '50%',
	backgroundColor: theme.colors.foreground[2],
	boxShadow: theme.shadow.sm,
});
