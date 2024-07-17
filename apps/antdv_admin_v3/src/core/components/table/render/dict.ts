import DSpan from '../../dict/span'
import DTag from '../../dict/tag'

export function renderDict(h, props) {
  return ({text, record, index}) => {
    const comp = props.show === 'tag' ? DTag : DSpan
    return h(comp, {...props, value: text})
  }
}
