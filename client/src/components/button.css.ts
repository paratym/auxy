import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

const buttonBase = style({
	all: 'unset',
});

globalStyle(`${buttonBase} > *`, {
	display: 'block',
});

export const iconButton = style([
	buttonBase,
	{
		color: theme.colors.foreground[0],

		selectors: {
			'&:disabled': {
				color: theme.colors.foreground[6],
			},

			'&[aria-checked=true]': {
				color: theme.colors.primary,
			},
		},
	},
]);
