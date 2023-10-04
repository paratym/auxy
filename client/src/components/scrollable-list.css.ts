import { createVar, style, styleVariants } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	height: 'auto',
	maxHeight: '100%',
	overflowY: 'auto',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	position: 'relative',
});

const shadeHeight = '1rem';
export const background = createVar();

const shadeBase = style({
	width: '100%',
	height: shadeHeight,
	minHeight: shadeHeight,
	position: 'sticky',
	inset: 0,
	zIndex: 1,
	background: `linear-gradient(transparent 0%, ${background} 100%)`,

	'::after': {
		content: '""',
		position: 'sticky',
		transform: 'translateZ(0)',
		inset: 0,
		zIndex: 1,
		mask: 'linear-gradient(transparent 0%, black 80%)',
		backdropFilter: 'blur(2px)',
	},
});

export const shade = styleVariants({
	top: [
		shadeBase,
		{
			bottom: 'unset',
			marginBottom: `-${shadeHeight}`,
			transform: 'rotate(180deg)',
		},
	],
	bottom: [
		shadeBase,
		{
			top: 'unset',
			marginTop: `-${shadeHeight}`,
		},
	],
});
