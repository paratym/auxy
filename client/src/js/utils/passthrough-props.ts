import { ComponentProps, ValidComponent } from "solid-js";

const SELECTOR_PREFIX = "$";
const DEFAULT_SELECTOR = `${SELECTOR_PREFIX}default`;

export type ComponentMap = Record<string, ValidComponent>;

type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

type OptionalPrefixedProps<TComponents extends ComponentMap> = {
  [K in keyof TComponents &
    string as `${typeof SELECTOR_PREFIX}${K}`]?: ComponentProps<TComponents[K]>;
};

type RequiredPrefixedProps<TComponents extends ComponentMap> = Omit<
  Required<OptionalPrefixedProps<TComponents>>,
  `${typeof SELECTOR_PREFIX}${OptionalKeys<TComponents> & string}`
>;

type PrefixedProps<TComponents extends ComponentMap> =
  OptionalPrefixedProps<TComponents> & RequiredPrefixedProps<TComponents>;

type AnySelector = `${typeof SELECTOR_PREFIX}${string}`;

export type PassthroughProps<TComponents extends ComponentMap> = Omit<
  PrefixedProps<TComponents>,
  typeof DEFAULT_SELECTOR
> &
  PrefixedProps<TComponents>[typeof DEFAULT_SELECTOR &
    keyof PrefixedProps<TComponents>];

export type StructuredProps<
  TProps extends object,
  TExcluded extends keyof TProps,
> = Omit<Pick<TProps, keyof TProps & AnySelector>, TExcluded> &
  Record<typeof DEFAULT_SELECTOR, Omit<TProps, AnySelector | TExcluded>>;

export function splitPassthroughProps<
  TProps extends object,
  TExcluded extends Array<keyof TProps>,
>(props: TProps, excludedKeys: TExcluded) {
  const descriptors = Object.getOwnPropertyDescriptors(props);
  const structuredProps = {};
  const defaultSelectorProps = {};

  for (const key in props) {
    if (excludedKeys.includes(key)) continue;
    const selector = key.startsWith(SELECTOR_PREFIX)
      ? structuredProps
      : defaultSelectorProps;

    Object.defineProperty(selector, key, descriptors[key]);
    delete descriptors[key];
  }

  Object.defineProperty(structuredProps, DEFAULT_SELECTOR, {
    get() {
      return defaultSelectorProps;
    },
  });

  const intermediateProps = Object.entries(descriptors).reduce(
    (props, [key, descriptor]) => {
      Object.defineProperty(props, key, descriptor);
      return props;
    },
    {},
  );

  return [
    structuredProps as StructuredProps<TProps, TExcluded[number]>,
    intermediateProps as Pick<TProps, TExcluded[number]>,
  ] as const;
}
