import { style } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	width: '100%',
	display: 'grid',
	gridTemplateColumns: '1fr auto auto',
	alignItems: 'center',
	gap: theme.gap.md,
	padding: theme.gap.xs,
	paddingRight: theme.gap.md,
	backgroundColor: theme.colors.background[1],
	borderRadius: theme.radius.sm,
	boxShadow: theme.shadow.sm,
});
