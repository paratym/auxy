import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const trackContainer = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: `${theme.gap.xs} ${theme.gap.xs}`,
});
