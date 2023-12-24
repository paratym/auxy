import { Navigate, Route, Router, Routes } from '@solidjs/router';

export function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' component={() => <h1>hello world</h1>} />
			</Routes>
		</Router>
	);
}
