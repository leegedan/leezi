import { makeSelect } from '../../factory'
import { search as fetchData } from '@/api/staff/staff'

export default makeSelect({
  data: () => {
    return fetchData({ pageSize: 10000 }).then((response) => {
      return (response.data || []).map((el) => {
        el.label = el.name
        el.value = el.id
        return el
      })
    })
  }
}) 