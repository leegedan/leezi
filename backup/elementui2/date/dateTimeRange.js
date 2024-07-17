import DateRange from './dateRange'
import { connect } from '../utils/hoc'
import { prefix } from '../utils/const'

const component = connect(DateRange)({
  type: 'datetimerange',
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间'
})

component.name = `${prefix}DateTimeRange`

export default component
