import { style, styleVariants } from '@vanilla-extract/css';
import { Size, theme } from '../theme.css';

const containerBase = style({
	maxWidth: '100%',
	aspectRatio: '1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: theme.colors.primary,
});

export const container = styleVariants({
	xs: [containerBase, { width: '2.2rem' }],
	sm: [containerBase, { width: '3.5rem' }],
	md: [containerBase, { width: '4.2rem' }],
	lg: [containerBase, { width: '5.2rem' }],
	xl: [containerBase, { width: '6.4rem' }],
	full: [containerBase, { width: '100%' }],
	fit: [containerBase, { width: 'fit-content' }],
} satisfies Record<Size, any>);

export const image = style({
	display: 'block',
	width: '100%',
	maxWidth: '100%',
	objectFit: 'contain',
});
