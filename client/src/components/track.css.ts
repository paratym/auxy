import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'stretch',
	gap: '16px',
});

export const infoContainer = style({
	color: 'white',
	flexGrow: 1,
});
