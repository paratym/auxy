import { Navigate, Router as SolidRouter, useRoutes } from "@solidjs/router";
import { authRoutes } from "./auth";
import { HomeView } from "./home";

export function Router() {
	const Routes = useRoutes([
		...authRoutes,
		{
			path: "/",
			component: HomeView,
		},
		{
			path: "*",
			component: () => <Navigate href="/auth/sign-up" />,
		},
	]);

	return (
		<SolidRouter>
			<Routes />
		</SolidRouter>
	);
}
