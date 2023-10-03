import { style, styleVariants } from '@vanilla-extract/css';
import { LibraryObjectInfoProps } from '.';

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
		},
	],
	vertical: [
		infoContainerBase,
		{
			alignItems: 'center',
		},
	],
} satisfies Record<NonNullable<LibraryObjectInfoProps['orientation']>, any>);
