import {
  ComponentProps,
  ValidComponent,
  mergeProps,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { classList } from "@/utils";
import * as styles from "./text.css";

type TextProps = {
  hideEmpty?: boolean;
};

const TEXT_PROPS_KEYS = ["hideEmpty"] as const;

const defaultTextProps = {
  hideEmpty: false,
} as const satisfies Partial<TextProps>;

function splitTextProps<TProps extends TextProps>(_props: TProps) {
  const [textProps, props] = splitProps(_props, TEXT_PROPS_KEYS);
  return [props, mergeProps(defaultTextProps, textProps)] as const;
}

export type TitleProps = ComponentProps<"h1"> & TextProps;

export function Title(_props: TitleProps) {
  const [htmlProps, textProps] = splitTextProps(_props);

  return (
    <h1
      {...htmlProps}
      class={classList(
        htmlProps.class,
        textProps.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}

const headingComponentMap = {
  lg: "h2",
  md: "h3",
  sm: "h4",
} as const satisfies Record<PropertyKey, ValidComponent>;

type HeadingComponent =
  (typeof headingComponentMap)[keyof typeof headingComponentMap];

export type HeadingProps = ComponentProps<HeadingComponent> &
  TextProps & {
    variant?: keyof typeof headingComponentMap;
  };

const defaultHeadingProps = {
  variant: "md",
} satisfies Partial<HeadingProps>;

export function Heading(_props: HeadingProps) {
  const [__props, textProps] = splitTextProps(_props);
  const [___props, htmlProps] = splitProps(__props, ["variant"]);
  const props = mergeProps(defaultHeadingProps, ___props);

  return (
    <Dynamic
      component={headingComponentMap[props.variant]}
      {...htmlProps}
      class={classList(
        htmlProps.class,
        textProps.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}

export type BodyProps = ComponentProps<"p"> & TextProps;

export function Body(_props: BodyProps) {
  const [htmlProps, textProps] = splitTextProps(_props);

  return (
    <p
      {...htmlProps}
      class={classList(
        htmlProps.class,
        textProps.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}

export type LabelProps = ComponentProps<"label" | "span"> & TextProps;

export function Label(_props: LabelProps) {
  const [htmlProps, textProps] = splitTextProps(_props);

  return (
    <Dynamic
      component={"for" in htmlProps ? "label" : "span"}
      {...htmlProps}
      class={classList(
        htmlProps.class,
        textProps.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}
