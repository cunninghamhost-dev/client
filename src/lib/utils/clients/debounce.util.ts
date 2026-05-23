// utils/clients/debounce.ts
export function debounce<F extends (...args: unknown[]) => void>(fn: F, delay = 400) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
