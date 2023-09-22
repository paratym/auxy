/* @refresh reload */
import { render } from 'solid-js/web';
import { AuxyRouter } from './router';
import { themeContainer } from './theme.css';
import * as styles from './global.css.ts';
import './global.css';

const root = document.getElementById('root')!;
root.classList.add(styles.root, themeContainer);
render(() => <AuxyRouter />, root);
