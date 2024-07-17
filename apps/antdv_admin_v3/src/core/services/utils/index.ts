// export function convertOpts({ data = [] }, map = { label: 'name', value: 'id' }) {
//   return data.map((el) => {
//     el.label = el[map.label]
//     el.value = el[map.value]
//     return el
//   })
// }

function recursion(source, parentId = 0, key = "id" /** , chain = false */) {
    const nodes = source.filter((el) => el.parentId === parentId);
    nodes.forEach((el) => {
        const children = recursion(source, el[key], key);
        if (children.length) {
            el.children = children;
            // if (chain) {
            //   // 谨慎，会导致双向引用
            //   children.forEach((child) => {
            //     child.$parent = el
            //   })
            // }
        }
    });
    return nodes;
}

export function toBeTree(source, parentId, key) {
    return recursion(source, parentId, key);
}
