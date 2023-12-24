import { render } from 'solid-js/web';
import { App } from './js';

const root = document.querySelector('#root')!;
const dispose = render(App, root);

if (import.meta.hot) {
	import.meta.hot.dispose(dispose);
}
