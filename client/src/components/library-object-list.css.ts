import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../theme.css';

export const container = style({
	position: 'relative',
	width: '100%',
	maxHeight: '100%',
	overflowY: 'auto',
	overflowX: 'hidden',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	gap: theme.gap.sm,
});

export const background = createVar();
const shadeBase = style({
	width: '100%',
	height: theme.gap.md,
	minHeight: theme.gap.md,
	position: 'sticky',
	inset: 0,
	zIndex: 1,
	background: `linear-gradient(transparent 0%, ${background} 100%)`,

	'::after': {
		content: '""',
		position: 'absolute',
		inset: 0,
		zIndex: 0,
		mask: 'linear-gradient(transparent 0%, black 80%)',
		backdropFilter: 'blur(2px)',
	},
});

export const shade = styleVariants({
	top: [shadeBase, { bottom: 'auto', transform: 'rotate(180deg)' }],
	bottom: [shadeBase, { top: 'auto' }],
});

export const trackContainer = style({
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	gap: theme.gap.sm,
	margin: `0 ${theme.gap.sm}`,
});
