import { ComplexStyleRule, style, styleVariants } from '@vanilla-extract/css';
import { LabelProps } from '.';
import { theme } from '../theme.css';

const labelBase = style({
	fontFamily: theme.fonts.body,
	color: theme.colors.foreground[3],
});

export const label = styleVariants<Record<NonNullable<LabelProps['size']>, ComplexStyleRule>>({
	xs: [
		labelBase,
		{
			fontSize: '0.6rem',
			lineHeight: '0.875rem',
		},
	],
	sm: [
		labelBase,
		{
			fontSize: '0.8rem',
			lineHeight: '1rem',
		},
	],
	md: [
		labelBase,
		{
			fontSize: '1rem',
			lineHeight: '1.25rem',
		},
	],
	lg: [
		labelBase,
		{
			fontSize: '1.25rem',
			lineHeight: '1.5rem',
		},
	],
	xl: [
		labelBase,
		{
			fontSize: '1.6rem',
			lineHeight: '1.8rem',
		},
	],
});
