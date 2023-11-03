import { Navigate, Route, Router, Routes } from '@solidjs/router';
import { HomeView, LibraryView, ProfileView, SearchView, SessionView } from './views';
import { AuthView } from './views/auth';

export function AuxyRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' component={() => <Navigate href='/home' />} />

				<Route path='/auth' component={AuthView} />
				<Route path='/session' component={SessionView} />
				<Route path='/home' component={HomeView} />
				<Route path='/search' component={SearchView} />
				<Route path='/library' component={LibraryView} />
				<Route path='/profile' component={ProfileView} />
			</Routes>
		</Router>
	);
}
