import { style } from '@vanilla-extract/css';

export const view = style({
	width: '100%',
	height: '100%',
	display: 'grid',
	gridTemplateColumns: '1fr',
	gridTemplateRows: 'auto 1fr auto',
});
