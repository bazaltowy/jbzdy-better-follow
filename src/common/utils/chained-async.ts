export const chainAsync = (fns: Array<(...args: any[]) => any>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let curr = 0;
      const last = fns[fns.length - 1];
      const next = () => {
        const fn = fns[curr++];
        fn === last ? resolve(fn()) : fn(next);
      };

      next();
    });
  });
};
