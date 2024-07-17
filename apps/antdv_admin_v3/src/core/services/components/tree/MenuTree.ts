import { makeTreeSelect } from '../../factory'
import { fwSpace, toBeTree } from '../../index'

const convert = (list) => toBeTree(list, 0, 'id')

const MenuTree = makeTreeSelect({
    data: () => fwSpace.get('MENU').then(convert)
})
MenuTree.name = 'MenuTreeSelect'

export default MenuTree
