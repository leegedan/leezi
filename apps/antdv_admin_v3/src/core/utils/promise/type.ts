export function isPromise(o: any): boolean {
  return (
    (typeof o === "object" || typeof o === "function") &&
    typeof o.then === "function"
  );
}
