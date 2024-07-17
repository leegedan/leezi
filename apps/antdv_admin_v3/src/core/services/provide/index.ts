import { createInnerSpace } from "./space";
import { useData } from '../../components/cache/dict'
import { getStaffData, getDeptData, getMenuList, getRoleList } from './services'

const space = createInnerSpace()

export function useFwSpace() {
    useData(space, {
        'MENU': getMenuList,
        'ROLE': getRoleList,
        'DEPT': getDeptData,
        'STAFF': getStaffData
    })
}

export default space