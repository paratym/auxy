type RequiredKeys<T extends object> = Extract<
  Exclude<
    {
      [K in keyof T]: undefined extends T[K] ? never : K;
    }[keyof T],
    undefined
  >,
  T extends Array<any> ? `${number}` : keyof T
>;

type IsRequired<T> = undefined extends T
  ? false
  : T extends object
    ? RequiredKeys<T> extends never
      ? false
      : true
    : true;

export type GenericOptionalParam<T> = IsRequired<T> extends true
  ? [T]
  : [_?: T | undefined];

export type GenericOptionalProperty<
  K extends PropertyKey,
  V,
> = IsRequired<V> extends true ? { [_ in K]: V } : { [_ in K]?: V | undefined };
