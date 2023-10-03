import { ComplexStyleRule, style, styleVariants } from '@vanilla-extract/css';
import { TitleProps } from '.';
import { theme } from '../theme.css';

const titleBase = style({
	margin: 'unset',
	fontFamily: theme.font,
	fontWeight: 700,
	color: theme.colors.foreground[0],
});

export const title = styleVariants<Record<NonNullable<TitleProps['size']>, ComplexStyleRule>>({
	xs: [
		titleBase,
		{
			fontSize: '1rem',
			lineHeight: '1.5rem',
		},
	],
	sm: [
		titleBase,
		{
			fontSize: '1.5rem',
			lineHeight: '1.75rem',
		},
	],
	md: [
		titleBase,
		{
			fontSize: '2rem',
			lineHeight: '2.25rem',
		},
	],
	lg: [
		titleBase,
		{
			fontSize: '2.5rem',
			lineHeight: '2.75rem',
		},
	],
	xl: [
		titleBase,
		{
			fontSize: '3rem',
			lineHeight: '3.25rem',
		},
	],
});
