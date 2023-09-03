export function throttle(
  interval: { current: NodeJS.Timeout | null },
  cb: Function,
  delay= 1000
) {
  if (interval.current) {
    return;
  } else {
    cb();
    interval.current = setTimeout(() => {
      interval.current = null;
    }, delay);
  }
}
