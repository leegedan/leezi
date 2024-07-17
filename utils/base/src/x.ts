const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);

const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});

const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

// const hasOwnProperty = Object.prototype.hasOwnProperty;
// const hasOwn = (val, key) => hasOwnProperty.call(val, key);

export function getDataAndAriaProps(props) {
  return Object.keys(props).reduce((memo, key) => {
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      memo[key] = props[key];
    }
    return memo;
  }, {});
}

export function toPx(val) {
  if (typeof val === "number") return `${val}px`;
  return val;
}

export function wrapPromiseFn(openFn: (resolve: VoidFunction) => VoidFunction) {
  let closeFn: VoidFunction;

  const closePromise = new Promise<boolean>((resolve) => {
    closeFn = openFn(() => {
      resolve(true);
    });
  });

  const result: any = () => {
    closeFn?.();
  };

  result.then = (filled: VoidFunction, rejected: VoidFunction) =>
    closePromise.then(filled, rejected);
  result.promise = closePromise;

  return result;
}

export {
  isOn,
  cacheStringFunction,
  camelize,
  hyphenate,
  capitalize,
};
