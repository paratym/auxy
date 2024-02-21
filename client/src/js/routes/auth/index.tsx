import { SignUpView } from "./sign-up";
import { SignInView } from "./sign-in";
import { Navigate, RouteDefinition } from "@solidjs/router";

export const authRoutes = [
  {
    path: "/auth",
    children: [
      {
        path: "/sign-in",
        component: SignInView,
      },
      {
        path: "/sign-up",
        component: SignUpView,
      },
    ],
  },
  {
    path: "*",
    component: () => <Navigate href="/auth/sign-up" />,
  },
] as const satisfies readonly RouteDefinition[];
