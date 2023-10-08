import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	color: theme.colors.foreground[6],
});

export const neutral = style({
	height: '0.25rem',
	borderRadius: theme.radius.full,
	backgroundColor: theme.colors.foreground[6],
});
