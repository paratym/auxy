import { style, styleVariants } from '@vanilla-extract/css';
import { LibraryObjectInfoProps } from '.';
import { theme } from '../theme.css';

const containerBase = style({
	display: 'grid',
});

export const container = styleVariants({
	horizontal: [
		containerBase,
		{
			gridTemplateColumns: 'auto 1fr',
			alignItems: 'center',
		},
	],
	vertical: [
		containerBase,
		{
			gridTemplateRows: 'auto 1fr',
			justifyItems: 'center',
		},
	],
} satisfies Record<NonNullable<LibraryObjectInfoProps['orientation']>, any>);

const imageContainerBase = style({
	maxWidth: '100%',
	aspectRatio: '1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: theme.colors.primary,
});

export const imageContainer = styleVariants({
	xs: [imageContainerBase, { width: '2.2rem', borderRadius: theme.radius.xs }],
	sm: [imageContainerBase, { width: '3.6rem', borderRadius: theme.radius.xs }],
	md: [imageContainerBase, { width: '6.4rem', borderRadius: theme.radius.xs }],
	lg: [imageContainerBase, { width: '8rem', borderRadius: theme.radius.sm }],
	xl: [imageContainerBase, { width: '12rem', borderRadius: theme.radius.sm }],
});

export const image = style({
	display: 'block',
	width: '100%',
	maxWidth: '100%',
	objectFit: 'contain',
});

const infoContainerBase = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
});

export const infoContainer = styleVariants({
	horizontal: [
		infoContainerBase,
		{
			alignItems: 'flex-start',
			textAlign: 'left' as const,
		},
	],
	vertical: [
		infoContainerBase,
		{
			alignItems: 'center',
			textAlign: 'center' as const,
		},
	],
} satisfies Record<NonNullable<LibraryObjectInfoProps['orientation']>, any>);
