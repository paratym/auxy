import { RouteDefinition } from "@solidjs/router";
import { LibraryView } from "./library";

export const libraryRoutes = [
  {
    path: "/library",
    component: LibraryView,
  },
] as const satisfies readonly RouteDefinition[];
