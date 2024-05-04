import { ComponentProps, ValidComponent, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  CreateStructuredProps,
  GenericOptionalParam,
  classList,
  splitStructuredProps,
} from "../utils";
import * as styles from "./text.css";

type TextProps = {
  hideEmpty?: boolean;
};

const TEXT_PROPS_KEYS = ["hideEmpty"] as const;

const defaultTextProps = {
  hideEmpty: false,
} as const satisfies Partial<TextProps>;

function splitTextProps<
  TProps extends TextProps,
  TExclude extends keyof TProps | undefined = undefined,
>(_props: TProps, ...[exclude]: GenericOptionalParam<Array<TExclude>>) {
  const [structuredProps, intermediateProps] = splitStructuredProps(_props, [
    ...(exclude ?? []),
    ...TEXT_PROPS_KEYS,
  ]);

  return [
    structuredProps,
    mergeProps(defaultTextProps, intermediateProps),
  ] as const;
}

export type TitleProps = CreateStructuredProps<{ default: "h1" }, TextProps>;

export function Title(_props: TitleProps) {
  const [structuredProps, props] = splitTextProps(_props);

  return (
    <h1
      {...structuredProps.default}
      class={classList(
        structuredProps.default.class,
        props.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}

const headingComponentMap = {
  lg: "h2",
  md: "h3",
  sm: "h4",
} as const satisfies Record<PropertyKey, ValidComponent>;

export type HeadingProps = CreateStructuredProps<
  {
    default: (typeof headingComponentMap)[keyof typeof headingComponentMap];
  },
  TextProps & {
    variant?: keyof typeof headingComponentMap;
  }
>;

const defaultHeadingProps = {
  variant: "md",
} satisfies Partial<HeadingProps>;

export function Heading(_props: HeadingProps) {
  const [structuredProps, __props] = splitTextProps(_props, ["variant"]);
  const props = mergeProps(defaultHeadingProps, __props);

  return (
    <Dynamic
      component={headingComponentMap[props.variant]}
      {...structuredProps.default}
      class={classList(
        structuredProps.default.class,
        props.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}

export type BodyProps = CreateStructuredProps<{ default: "p" }, TextProps>;

export function Body(_props: BodyProps) {
  const [structuredProps, props] = splitTextProps(_props);

  return (
    <p
      {...structuredProps.default}
      class={classList(
        structuredProps.default.class,
        props.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}

export type LabelProps = CreateStructuredProps<
  { default: "label" | "span" },
  TextProps
>;

export function Label(_props: LabelProps) {
  const [structuredProps, props] = splitTextProps(_props);

  return (
    <Dynamic
      component={"for" in structuredProps.default ? "label" : "span"}
      {...(structuredProps.default as ComponentProps<any>)}
      class={classList(
        structuredProps.default.class,
        props.hideEmpty && styles.hideEmpty,
      )}
    />
  );
}
