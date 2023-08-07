export type Endpoints<T> = {
  [Property in keyof T]: <X, S>(body: S) => Promise<X>;
};
