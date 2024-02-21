import { Router as SolidRouter, useRoutes } from "@solidjs/router";
import { authRoutes } from "./auth";

export function Router() {
  const Routes = useRoutes([...authRoutes]);
  return (
    <SolidRouter>
      <Routes />
    </SolidRouter>
  );
}
