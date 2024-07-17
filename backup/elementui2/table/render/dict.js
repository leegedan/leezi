import span from '../../Dict/span'
import tag from '../../Dict/tag'

export function renderDict(h, props) {
  return (text, record, index) => {
    const comp = props.show === 'tag' ? tag : span
    return h(comp, { props: {...props, value: text} })
  }
}
