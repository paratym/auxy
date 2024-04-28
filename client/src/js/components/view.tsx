import { useNavigate } from "@solidjs/router";
import { Show, mergeProps } from "solid-js";
import * as styles from "./view.css";
import { PassthroughProps, splitPassthroughProps } from "../utils";

export type ViewProps = PassthroughProps<{ default: "div"; overlay: "div" }> & {
  public?: boolean;
};

const defaultViewProps = {
  public: false,
} satisfies Partial<ViewProps>;

export function View(_props: ViewProps) {
  const defaultedProps = mergeProps(defaultViewProps, _props);
  const [passthroughProps, props] = splitPassthroughProps(defaultedProps, [
    "public",
  ]);

  const navigate = useNavigate();

  // onMount(() => {
  //   if (props.authed && !sessionId) return navigate("/auth/sign-up");
  //   if (!props.authed && sessionId) return navigate("/");
  // });

  return (
    <>
      <Show when={passthroughProps.$overlay.children}>
        <div
          {...passthroughProps.$overlay}
          classList={mergeProps(
            { [styles.overlay]: true },
            passthroughProps.$overlay.classList,
          )}
        />
      </Show>
      <div
        {...passthroughProps.$default}
        classList={mergeProps(
          { [styles.layout]: true },
          passthroughProps.$default.classList,
        )}
      />
    </>
  );
}
