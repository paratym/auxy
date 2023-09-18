import { Route, Router, Routes } from '@solidjs/router';
import { PlayerView, SessionView } from './views';

export function AuxyRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/player' component={PlayerView} />
				<Route path='/session' component={SessionView} />
			</Routes>
		</Router>
	);
}
