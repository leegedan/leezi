// import axios from 'axios'
// import wait from './wait'


// export function request(url, data) {
//   return axios({
//     url: url,
//     method: 'post',
//     headers: {
//     },
//     data: data,
//     timeout: 300000,
//     responseType: 'blob'
//   })
// }

export function downfile(blob, name = 'export.xls') {
  // const blob = new Blob([byte])
  const link = document.createElement('a')
  const URL = window.URL || window.webkitURL
  const href = URL.createObjectURL(blob)
  link.download = name
  link.href = href
  link.click()
  return true
}


// export function downfile(req, name = 'export.xls') {
//   return req.then(res => {
//     return download(name, res.data)
//   })
// }

// // export function downfile(url, name = 'export.xls', data) {
// //   return request(url, data).then(res => {
// //     return download(name, res.data)
// //   })
// // }

// export function downZip(url, data) {
//   return request(url, data).then(res => {
//     const blob = new Blob([res.data], { type: 'application/zip' })
//     const url = window.URL.createObjectURL(blob)
//     window.location.href = url
//     // const link = document.createElement('a')
//     // const URL = window.URL || window.webkitURL
//     // const href = URL.createObjectURL(blob)
//     // link.download = name
//     // link.href = href
//     // link.click()
//     return true
//   })
// }
