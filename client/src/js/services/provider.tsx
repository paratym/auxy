import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/solid-query";
import { JSX } from "solid-js";
import { auxyApi } from ".";

const queryCache = new QueryCache({
  onError(error) {
    if (
      typeof error === "object" &&
      "error" in error &&
      error.error === ("Unauthorized" satisfies auxyApi.Error)
    ) {
      // TODO: support base url & add redirect back to current url
      const redirect = new URL("/auth/sign-in", location.host);
      history.pushState({}, "", redirect);
    }
  },
});

const mutationCache = new MutationCache();

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
});

type ServiceProviderProps = {
  children: JSX.Element;
};

export function ServiceProvider(props: ServiceProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
