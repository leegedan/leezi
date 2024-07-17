export function fmtNumber(value) {
    return value ? value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'
  }
  
  export function fmtPhone(value) {
    return value.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
  }
  
  export function fmtIdCard(value) {
    // const reg = /^(.{6})(?:\d+)(.{4})$/
    return value.replace(/^(.{6})(?:\w+)(.{2})$/, '$1****$2')
  }
  
  export function fmtCNY(value, deco = '') {
    value = parseInt(value) || 0
    if (value) {
      const val = (value / 100).toString().split('.')
      const txt = val[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (val[1]) {
        return `${deco}${txt}.${val[1]}`
      } else {
        return deco + txt
      }
    } else {
      return '0'
    }
  }
  