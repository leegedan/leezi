// import type { ComponentOptions } from 'vue'
const copy = (...args) => Object.assign({}, ...args);

/**
 * 复制 component.props，设置部分props默认值
 * @param {*} component
 * @param {*} part
 * @returns
 */
export const mergeProps = (component, part) => {
  const origin = component.props;
  if (origin === undefined || Array.isArray(origin)) {
    return origin;
  }
  const props = copy(origin);
  Object.keys(part).forEach((key) => {
    if (props[key]) {
      props[key] = copy(props[key]);
      props[key].default =
        typeof part[key] === "object" ? () => part[key] : part[key];
      props[key].required = false;
    }
  });
  return props;
};

/**
 * 此函数`connect`接收一个组件，返回一个新函数。
 * 这个新函数能接收一个`part`参数，返回一个新组件，该组件会将`part`合并到组件的props中。
 * @param {*} component
 * @returns
 */
export const connect = (component) => {
  return function inject(part) {
    if (component.props) {
      const props = mergeProps(component, part);
      return copy(component, { props });
    } else {
      return component;
    }
  };
};
