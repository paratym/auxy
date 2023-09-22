import { Route, Router, Routes } from '@solidjs/router';
import { HomeView, PlayerView, SessionView } from './views';

export function AuxyRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' component={HomeView} />
				<Route path='/player' component={PlayerView} />
				<Route path='/session' component={SessionView} />
			</Routes>
		</Router>
	);
}
