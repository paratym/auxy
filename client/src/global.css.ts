import { style } from '@vanilla-extract/css';
import { theme } from './theme.css';

export const root = style({
	fontFamily: theme.fonts.body,
	fontSize: '1rem',
	lineHeight: 1.5,
	color: theme.colors.foreground[0],
	backgroundColor: theme.colors.background[0],
	padding: theme.gap.lg,
	paddingBottom: 'revert',
});
