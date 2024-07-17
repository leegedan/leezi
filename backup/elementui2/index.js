import DateRange from './date/dateRange'
import DateTimeRange from './date/dateTimeRange'
import InputNumber from './input/number'
import './style.less'

export default {
  install: (Vue) => {
    Vue.component(DateRange.name, DateRange)
    Vue.component(DateTimeRange.name, DateTimeRange)
    Vue.component(InputNumber.name, InputNumber)
  }
}