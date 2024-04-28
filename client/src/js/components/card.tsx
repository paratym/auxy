import { JSX, Show, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { PassthroughProps, splitPassthroughProps } from "../utils";
import { Heading } from ".";

export type CardProps = PassthroughProps<{
  default: "main" | "section";
  title: typeof Heading;
}> & {
  main?: boolean;
};

const defaultProps = {
  main: false,
} satisfies Partial<CardProps>;

export function Card(_props: CardProps) {
  const defaultedProps = mergeProps(defaultProps, _props);
  const [passthroughProps, props] = splitPassthroughProps(defaultedProps, [
    "main",
  ]);

  return (
    <Dynamic
      component={props.main ? "main" : "section"}
      {...passthroughProps.$default}
    >
      <Show when={passthroughProps.$title.children}>
        <Heading {...passthroughProps.$title} />
      </Show>
      {passthroughProps.$default.children}
    </Dynamic>
  );
}
