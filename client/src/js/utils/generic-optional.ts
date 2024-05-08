// type IncludedKeys<T> = T extends Array<any>
//   ? keyof T
//   : T extends object
//     ? keyof T
//     : never;
// type x = IncludedKeys<["", ""]>;
//
// export type OptionalKeys<T> = Exclude<
//   {
//     [K in IncludedKeys<T>]: undefined extends T[K]
//       ? K
//       : T[K] extends never
//         ? K
//         : never;
//   }[IncludedKeys<T>],
//   undefined
// >;

// TODO: fix
export type GenericOptionalParam<T> = [T];
// ? [param?: T | undefined]
// : [T];

// TODO: fix
export type GenericOptionalProperty<K extends PropertyKey, V> = { [k in K]: V };
