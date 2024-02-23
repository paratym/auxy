import { useNavigate } from "@solidjs/router";
import { JSX, mergeProps, onMount } from "solid-js";

export type ViewProps = {
  children: JSX.Element;
  authed?: boolean;
};

const defaultViewProps: Partial<ViewProps> = {
  authed: true,
};

export function View(_props: ViewProps) {
  const props = mergeProps(defaultViewProps, _props);
  const navigate = useNavigate();

  // onMount(() => {
  //   if (props.authed && !sessionId) return navigate("/auth/sign-up");
  //   if (!props.authed && sessionId) return navigate("/");
  // });

  return <div>{props.children}</div>;
}
