import { render } from 'solid-js/web';
import { AuxyRouter } from './router';
import { themeContainer } from './theme.css';
import * as styles from './global.css.ts';
import './global.css';

const html = document.querySelector('html')!;
html.classList.add(themeContainer);

const root = document.querySelector('#root')!;
root.classList.add(styles.root);

const dispose = render(() => <AuxyRouter />, root);
if (import.meta.hot) {
	import.meta.hot.dispose(dispose);
}
