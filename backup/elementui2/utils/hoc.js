import { copy } from "./index";
/**
 * 返回新vueComponent.props，并设置部分props默认值
 * @param {*} vueComponent
 * @param {*} part
 * @returns
 */
export const mergeProps = (vueComponent, part) => {
    const origin = vueComponent.props;
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
 * 绑定组件，返回给目标组件注入props默认值的方法
 * @param {*} vueComponent
 * @returns
 */
export const connect = (vueComponent) => {
    return function inject(part) {
        if (vueComponent.props) {
            const props = mergeProps(vueComponent, part);
            return copy(vueComponent, { props });
        }
        else {
            return vueComponent;
        }
    };
};
