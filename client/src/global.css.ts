import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, ::before, ::after', {
	boxSizing: 'border-box',
});

globalStyle('body, html, #root', {
	margin: 'unset',
	width: '100vw',
	maxWidth: '100vw',
	height: '100vh',
	maxHeight: '100vh',
	overflow: 'hidden',
});
