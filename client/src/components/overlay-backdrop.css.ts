import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';
import { withOpacity } from '../utils';

export const backdrop = style({
	zIndex: 1,
	position: 'absolute',
	inset: 0,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.gap.lg,
	padding: theme.gap.lg,
	backgroundColor: withOpacity(theme.colors.background[0], 80),
	backdropFilter: 'blur(4px)',
});
