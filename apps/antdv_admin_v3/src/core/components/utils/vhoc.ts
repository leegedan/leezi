import { copy } from "./base";

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
