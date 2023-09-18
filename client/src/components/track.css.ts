import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'stretch',
	maxHeight: 'min-content',
	gap: '16px',
});

export const infoContainer = style({
	color: 'white',
	minWidth: 'max-content',
	flexGrow: 1,
});
