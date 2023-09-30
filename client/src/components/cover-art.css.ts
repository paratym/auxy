import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	maxWidth: '100%',
	aspectRatio: '1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: theme.colors.primary,
});

export const image = style({
	display: 'block',
	width: '100%',
	maxWidth: '100%',
	objectFit: 'contain',
});
