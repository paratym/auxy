import { createTheme } from '@vanilla-extract/css';

export type AbsoluteSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Size = AbsoluteSize | 'fit' | 'full';

export type Theme = typeof theme;
export const [themeContainer, theme] = createTheme({
	colors: {
		primary: '#7b1bd0',
		foreground: {
			0: 'hsl(210deg 6% 96%)',
			1: 'hsl(220deg 8% 92%)',
			2: 'hsl(230deg 8% 86%)',
			3: 'hsl(240deg 10% 82%)',
			4: 'hsl(250deg 10% 78%)',
			5: 'hsl(260deg 12% 72%)',
			6: 'hsl(270deg 12% 64%)',
		},
		background: {
			0: 'hsl(280deg 12% 4%)',
			1: 'hsl(272deg 8% 8%)',
			2: 'hsl(264deg 8% 12%)',
			3: 'hsl(256deg 6% 16%)',
			4: 'hsl(248deg 6% 18%)',
			5: 'hsl(240deg 4% 20%)',
			6: 'hsl(232deg 4% 20%)',
		},
	},
	font: 'Bw Nista Geometric, Helvetica, sans-serif',
	shadow: {
		xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
		sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
		md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
		lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
		xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
	} satisfies Record<AbsoluteSize, string>,
	radius: {
		xs: '0.25rem',
		sm: '0.4rem',
		md: '0.6rem',
		lg: '0.8rem',
		xl: '1rem',
		full: '9999px',
	} satisfies Partial<Record<Size, string>>,
	gap: {
		xs: '0.4rem',
		sm: '0.6rem',
		md: '1rem',
		lg: '1.6rem',
		xl: '2.4rem',
	} satisfies Record<AbsoluteSize, string>,
});
