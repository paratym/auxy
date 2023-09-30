import { Route, Router, Routes } from '@solidjs/router';
import { HomeView, SessionView } from './views';

export function AuxyRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' component={HomeView} />
				<Route path='/session' component={SessionView} />
			</Routes>
		</Router>
	);
}
