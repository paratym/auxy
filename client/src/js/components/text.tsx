import { ValidComponent, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { PassthroughProps, splitPassthroughProps } from "../utils";

export type TiltleProps = PassthroughProps<{ default: "h1" }>;

export function Title(_props: TiltleProps) {
  const [passthroughProps] = splitPassthroughProps(_props, []);
  return <h1 {...passthroughProps.$default} />;
}

const headingComponentMap = {
  lg: "h2",
  md: "h3",
  sm: "h4",
} as const satisfies Record<PropertyKey, ValidComponent>;

export type HeadingProps = PassthroughProps<{
  default: (typeof headingComponentMap)[keyof typeof headingComponentMap];
}> & {
  variant?: keyof typeof headingComponentMap;
};

const defaultHeadingProps = {
  variant: "md",
} satisfies Partial<HeadingProps>;

export function Heading(_props: HeadingProps) {
  const defaultedProps = mergeProps(defaultHeadingProps, _props);
  const [passthroughProps, props] = splitPassthroughProps(defaultedProps, [
    "variant",
  ]);

  return (
    <Dynamic
      component={headingComponentMap[props.variant]}
      {...passthroughProps.$default}
    />
  );
}

export type BodyProps = PassthroughProps<{ default: "p" }>;

export function Body(_props: BodyProps) {
  const [passthroughProps] = splitPassthroughProps(_props, []);
  return <p {...passthroughProps.$default} />;
}

export type LabelProps = PassthroughProps<{ default: "label" | "span" }>;

export function Label(_props: LabelProps) {
  const [passthroughProps] = splitPassthroughProps(_props, []);

  return (
    <Dynamic
      component={"for" in passthroughProps.$default ? "label" : "span"}
      {...passthroughProps.$default}
    />
  );
}
