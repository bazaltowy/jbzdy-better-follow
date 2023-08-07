export const createChainedFunctions = <
  Callback extends (arg: Item) => void | Promise<void>,
  Item
>(
  items: Item[],
  callback: Callback,
  timeout: number = 500
) => {
  return items.map((user) => {
    return async (next: () => any) => {
      await callback(user);

      setTimeout(next, timeout);
    };
  });
};
