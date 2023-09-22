import { style } from '@vanilla-extract/css';

export const container = style({
	maxWidth: '100%',
	aspectRatio: '1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'pink',
});

export const image = style({
	display: 'block',
	width: '100%',
	maxWidth: '100%',
	objectFit: 'contain',
});
