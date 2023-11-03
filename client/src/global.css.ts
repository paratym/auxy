import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from './theme.css';

globalStyle('*, ::before, ::after', {
	boxSizing: 'border-box',
});

globalStyle('html, body, #root', {
	margin: 'unset',
	width: '100%',
	maxWidth: '100%',
	height: '100%',
	maxHeight: '100%',
	overflow: 'hidden',
	backgroundColor: theme.colors.background[0],
});

globalStyle('svg, img', {
	display: 'block',
});

export const root = style({
	fontFamily: theme.font,
	fontSize: '1rem',
	lineHeight: 1.5,
	color: theme.colors.foreground[0],
	padding: theme.gap.md,
});
