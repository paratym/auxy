import { Navigate, Router as SolidRouter, useRoutes } from "@solidjs/router";
import { authRoutes } from "./auth";
import { HomeView } from "./home";
import { libraryRoutes } from "./library";

export function Router() {
  const Routes = useRoutes([
    ...authRoutes,
    ...libraryRoutes,
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "*",
      component: () => <Navigate href="/" />,
    },
  ]);

  return (
    <SolidRouter>
      <Routes />
    </SolidRouter>
  );
}
