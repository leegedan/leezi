import { search as menuList } from '@/api/base/menu'
import { search as roleList } from '@/api/base/role'
import { search as deptList } from '@/api/staff/dept'
import { search as staffList } from '@/api/staff/staff'

export function getStaffData() {
  return staffList({ pageSize: 10000 }).then((ret) => {
    return (ret.data || []).map((el) => {
      // el.name = el.name
      el.label = el.name
      el.value = el.id
      return el
    })
  })
}

export function getMenuList() {
  return menuList({ pageSize: 10000 }).then((ret) => {
    return (ret.data || []).map((el) => {
      // el.name = el.name
      el.label = el.name
      el.value = el.id
      return el
    })
  })
}

export function getRoleList() {
  return roleList({ pageSize: 10000 }).then((ret) => {
    return (ret.data || []).map((el) => {
      el.label = el.name
      el.value = el.id
      return el
    })
  })
}

export function getDeptData() {
  return deptList({ pageSize: 10000 }).then((ret) => {
    return (ret.data || []).map((el) => {
      // el.name = el.name
      el.label = el.name
      el.value = el.id
      return el
    })
  })
}