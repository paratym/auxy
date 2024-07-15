import { ComplexStyleRule, styleVariants } from "@vanilla-extract/css";
import { ButtonProps } from "./button";

export const button = styleVariants({
  default: {},
  primary: {},
  disabled: {},
  active: {},
  inactive: {},
} satisfies Record<ButtonProps["variant"], ComplexStyleRule>);
