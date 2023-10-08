import { Route, Router, Routes } from '@solidjs/router';
import { HomeView, LibraryView, ProfileView, SearchView, SessionView } from './views';

export function AuxyRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/session' component={SessionView} />
				<Route path='/home' component={HomeView} />
				<Route path='/search' component={SearchView} />
				<Route path='/library' component={LibraryView} />
				<Route path='/profile' component={ProfileView} />
			</Routes>
		</Router>
	);
}
