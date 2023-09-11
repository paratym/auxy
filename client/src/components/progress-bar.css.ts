import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	maxWidth: '100%',
});

export const labelContainer = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	paddingTop: '6px',
	color: '#fff',
});

export const track = style({
	width: '100%',
	height: '6px',
	borderRadius: '3px',
	backgroundColor: '#e6e6e6',
});

export const progress = style({
	height: '100%',
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	borderRadius: '3px',
	backgroundColor: '#8221bf',
});

export const thumb = style({
	width: '16px',
	height: '16px',
	position: 'absolute',
	inset: 'auto',
	right: '-8px',
	backgroundColor: '#fff',
	borderRadius: '50%',
	alignSelf: 'center',
});
