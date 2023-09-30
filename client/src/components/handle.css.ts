import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../theme.css';
import { HandleProps } from '.';

export const container = style({
	color: theme.colors.foreground[6],
});

export const neutral = style({
	height: '0.25rem',
	borderRadius: theme.radius.full,
	backgroundColor: theme.colors.foreground[6],
});

export const size = styleVariants({
	xs: { width: '2rem' },
	sm: { width: '2.6rem' },
	md: { width: '3.2rem' },
	lg: { width: '4.2rem' },
	xl: { width: '5rem' },
} satisfies Record<keyof HandleProps['size'], any>);
