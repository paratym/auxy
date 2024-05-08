import { Navigate } from "@solidjs/router";
import { authRoutes } from "./auth";
import { HomeView } from "./home";
import { libraryRoutes } from "./library";

export const routes = [
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
];
