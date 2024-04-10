// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const  debounce = <T extends (...args: any[]) => any>(fn: T, ms = 100) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export { debounce };
