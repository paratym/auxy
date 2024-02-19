import { Heading } from "../components";
import { Route, Router as SolidRouter, Routes } from "@solidjs/router";

export function Router() {
	return (
		<SolidRouter>
			<Routes>
				<Route path="/" component={Heading} />
			</Routes>
		</SolidRouter>
	);
}
