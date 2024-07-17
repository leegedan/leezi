import { makeTreeSelect } from '../../factory'
import { fwSpace, toBeTree } from '../../index'

const convert = (list) => toBeTree(list, 0, 'id')

const DeptTree = makeTreeSelect({
    data: () => fwSpace.get('DEPT').then(convert)
})
DeptTree.name = 'DeptTreeSelect'

export default DeptTree
