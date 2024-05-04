export type GenericOptionalParam<T> = Partial<T> extends T
	? [param?: T | undefined]
	: [T];

export type GenericOptionalProperty<
	K extends PropertyKey,
	V,
> = V extends undefined ? { [k in K]?: V } : { [k in K]: V };
