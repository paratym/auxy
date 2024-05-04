import { ComponentProps, ValidComponent } from "solid-js";
import { GenericOptionalParam } from "./generic-optional";
import { Label } from "../components";

const SELECTOR_PREFIX = "$";
const DEFAULT_SELECTOR_KEY = "default";
const DEFAULT_SELECTOR = `${SELECTOR_PREFIX}${DEFAULT_SELECTOR_KEY}`;

type ComponentMap = Record<string, ValidComponent>;

type PrefixedProps<TComponents extends ComponentMap> = {
	[K in keyof TComponents &
	string as `${typeof SELECTOR_PREFIX}${K}`]?: ComponentProps<
		NonNullable<TComponents[K]>
	>;
};

type SelectorProps<TComponents extends ComponentMap> = Omit<
	PrefixedProps<TComponents>,
	typeof DEFAULT_SELECTOR
> &
	(typeof DEFAULT_SELECTOR extends keyof PrefixedProps<TComponents>
		? PrefixedProps<TComponents>[typeof DEFAULT_SELECTOR]
		: {});

export type CreateSelectorProps<
	TComponents extends ComponentMap,
	TProps extends {} = {},
// TODO: this should omit keyof TProps from SelectorProps but that breaks default params for some reason
> = TProps & SelectorProps<TComponents>;

type StripPrefix<K extends string> =
	K extends `${typeof SELECTOR_PREFIX}${infer S}` ? S : K;

type StrippedProps<TProps> = {
	[K in keyof TProps & string as StripPrefix<K>]?: TProps[K];
};

type AnySelector = `${typeof SELECTOR_PREFIX}${string}`;

type PreStructuredProps<TProps, TExcluded extends keyof TProps> = Omit<
	Pick<TProps, keyof TProps & AnySelector>,
	TExcluded | "$ServerOnly"
>;

export type StructuredProps<
	TProps extends object,
	TExcluded extends keyof TProps,
> = StrippedProps<PreStructuredProps<TProps, TExcluded>> &
	Record<
		typeof DEFAULT_SELECTOR_KEY,
		Omit<TProps, keyof PreStructuredProps<TProps, TExcluded>>
	>;

export function splitStructuredProps<
	TProps extends object,
	TExcluded extends keyof TProps | undefined = undefined,
>(props: TProps, ...[excludedKeys]: GenericOptionalParam<Array<TExcluded>>) {
	const structuredProps = {};
	const defaultSelectorProps = {};
	const intermediateProps = {};

	const descriptors = Object.getOwnPropertyDescriptors(props);

	for (const key in props) {
		const selector = excludedKeys?.includes(key as any)
			? intermediateProps
			: key.startsWith(SELECTOR_PREFIX)
				? structuredProps
				: defaultSelectorProps;

		const strippedKey = Object.is(selector, structuredProps)
			? key.substring(1)
			: key;

		Object.defineProperty(selector, strippedKey, descriptors[key]);
	}

	Object.defineProperty(structuredProps, DEFAULT_SELECTOR_KEY, {
		get: () => defaultSelectorProps,
	});

	return [
		structuredProps as StructuredProps<TProps, NonNullable<TExcluded>>,
		intermediateProps as Pick<TProps, NonNullable<TExcluded>>,
	] as const;
}
