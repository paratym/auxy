/* @refresh reload */
import { render } from 'solid-js/web';
import { AuxyRouter } from './router';
import './global.css';

render(() => <AuxyRouter />, document.getElementById('root')!);
