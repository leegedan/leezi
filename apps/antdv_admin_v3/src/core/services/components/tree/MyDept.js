// import gen from '../genTree'
// import { getData, convertTree } from '../../index'
// import { myDept } from '@/api/base/department'

// const convert = (list) => convertTree(list, 0, 'departId')
// const tree = gen(() => getData('DEPT').then((list) => {
//     return myDept({}).then(ret => {
//         const dlist = ret.data.map(el => el.departId)
//         list.forEach(el => {
//             if (!dlist.includes(el.departId)) {
//                 el.disabled = true
//             }
//         })
//         return convert(list)
//     })
// }))
// export default tree
