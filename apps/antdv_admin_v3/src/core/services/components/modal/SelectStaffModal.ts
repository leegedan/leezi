import { makeInputSearchModal } from '../../factory'
import { search } from '@/api/staff/staff'

const props = {
  title: '选择员工',
  width: '640px',
  textKey: 'name',
  bindKeys: [['staffId', 'id'], 'phone'],
  conf: {
    rowKey: 'id',
    filters: [{ key: 'name', label: '名称', type: 'input' }],
    columns: [
      {
        dataIndex: 'rowNum'
      },
      {
        title: '员工名称',
        dataIndex: 'name'
      },
      {
        title: '联系方式',
        dataIndex: 'phone'
      }
    ]
  },
  loadData: (parm) => {
    return search(parm)
  }
}

const Component = makeInputSearchModal(props, 'radio')
Component.name = 'YoHo'
export default Component
