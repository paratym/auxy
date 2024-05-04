import { mergeProps } from "solid-js";
import * as styles from "./view.css";
import { CreateSelectorProps, classList, splitStructuredProps } from "../utils";

export type ViewProps = CreateSelectorProps<
  {
    default: "main";
    layout?: "div";
  },
  { public?: boolean }
>;

const defaultViewProps = {
  public: false,
} satisfies Partial<ViewProps>;

export function View(_props: ViewProps) {
  const defaultedProps = mergeProps(defaultViewProps, _props);
  const [structuredProps, props] = splitStructuredProps(defaultedProps, [
    "public",
  ]);

  // const navigate = useNavigate();
  // onMount(() => {
  // 	if (!props.public && !sessionId) return navigate("/auth/sign-up");
  // });

  return (
    <>
      <div
        {...structuredProps.layout}
        class={classList(structuredProps.layout?.class, styles.layout)}
      >
        <main
          {...structuredProps.default}
          class={classList(structuredProps.default.class, styles.main)}
        />
      </div>
    </>
  );
}
