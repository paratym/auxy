import { JSX, mergeProps } from "solid-js";
import * as styles from "./view.css";
import { Surface } from ".";

export type ViewProps = {
  public?: boolean;
  layout?: "centered";
  children?: JSX.Element;
};

const defaultViewProps = {
  public: false,
  layout: "centered",
} satisfies Partial<ViewProps>;

export function View(_props: ViewProps) {
  const props = mergeProps(defaultViewProps, _props);
  // const [structuredProps, props] = splitStructuredProps(defaultedProps, [
  //   "public",
  //   "variant",
  // ]);

  // const navigate = useNavigate();
  // onMount(() => {
  // 	if (!props.public && !sessionId) return navigate("/auth/sign-up");
  // });

  return (
    <>
      <Surface variant="background" class={styles.layout[props.layout]}>
        <Surface variant="main">{props.children}</Surface>
      </Surface>
    </>
  );
}
