export function extendFunction(
  obj: Record<PropertyKey, any>,
  key: string,
  extFn: (...args: any[]) => any
) {
  const original = obj[key];

  obj[key] = function (...args: any[]) {
    extFn(...args);

    return original.call(obj, ...args);
  };
}
