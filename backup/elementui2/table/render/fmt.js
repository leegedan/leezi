import moment from '../../utils/moment'
import { fmtCNY, fmtNumber } from '../../utils/fmt'
import { renderDict } from './dict'

function genRender(h, { type, ...rest }) {
  if (type === 'dict') {
    return renderDict(h, rest)
  } else if (type === 'date') {
    return renderDate(rest.fmt)
  } else if (type === 'array') {
    return renderArray(rest.fmt)
  } else if (type === 'cny') {
    return renderCNY(rest.fmt)
  }
}

function renderDate(fmt = 'YYYY-MM-DD') {
  return (text, record, index) => {
    return text ? moment(text).format(fmt) : ''
  }
}

function renderArray(fmt = ',') {
  return (text, record, index) => {
    if (Array.isArray(text) && text.length) {
      return text.filter((t) => !!t).join(fmt)
    }
    return ''
  }
}

function renderCNY(deco) {
  return (text, record, index) => {
    return fmtCNY(text, deco)
  }
}

export default genRender
