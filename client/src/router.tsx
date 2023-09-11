import { Route, Router, Routes } from '@solidjs/router';
import { PlayerView } from './views/player';

export function AuxyRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/player' component={PlayerView} />
			</Routes>
		</Router>
	);
}
