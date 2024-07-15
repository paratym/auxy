export type MapLeafNodes<T, N> = T extends object
  ? { [K in keyof T]: MapLeafNodes<T[K], N> }
  : N;
