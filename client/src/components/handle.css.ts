import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const handle = style({
	height: '0.25rem',
	borderRadius: theme.radius.full,
	backgroundColor: theme.colors.foreground[6],
});
