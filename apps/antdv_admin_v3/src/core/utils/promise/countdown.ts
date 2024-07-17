import { wait } from "./wait";

export default function countdown(
  seconds: number,
  callback?: (n: number) => void
): Promise<number> {
  if (callback) {
    callback(seconds);
  }
  if (seconds) {
    return wait(1000).then((x) => {
      return countdown(--seconds, callback);
    });
  }
  return Promise.resolve(0);
}
