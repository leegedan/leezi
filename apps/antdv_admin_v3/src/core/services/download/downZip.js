import JSZip from 'jszip'
import axios from 'axios'
import FileSaver from 'file-saver'
import { LimitPromise } from './queue'


export function request(url, data) {
  return axios({
    url: url,
    headers: {
    },
    data: data,
    timeout: 300000,
    responseType: 'blob',
  })
}

export function getFile(url, data) {
  return request(url, data).then(res => {
    return res.data
  }).catch(e => {
    return false
  })
}

// 并发队列
// 请求上限
const MAX = 60
// 核心控制器
const limitP = new LimitPromise(MAX)

export function downZipFile(files, zipName) {
  const zip = new JSZip()
  const promises = files.map(f => {
    return f.data.then(data => {
      // console.log(data)
      if (data) {
        zip.file(f.name, data, { binary: true })
      }
    })
  })
  return Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      // 生成二进制流
      FileSaver.saveAs(content, zipName) // 利用file-saver保存文件
    })
  })
}

export function downZipFile2(url, files, zipName) {
  const zip = new JSZip()
  const task = (parm) => getFile(url, { data: parm }).then(data => {
    // console.log(data)
    if (data) {
      zip.file(parm.sourceFileName, data, { binary: true })
    }
    return true
  })
  const promises = files.map(f => {
    return limitP.call(task, f)
  })
  // const promises = files.map(f => {
  //   return f.data.then(data => {
  //     console.log(data)
  //     zip.file(f.name, data, { binary: true })
  //   })
  // })

  return Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      // 生成二进制流
      FileSaver.saveAs(content, zipName) // 利用file-saver保存文件
    })
  })
}

// const queue = []
// const maxLen = 200

function chunk(array, size) {
  const length = array.length
  if (!length || !size || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0

  const result = new Array(Math.ceil(length / size))
  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}

export function downZipFile3(url, files, zipName) {
  const list = chunk(files, 500)
  const limitP2 = new LimitPromise(1)
  const task = (arr) => downZipFile2(url, arr, zipName)

  const promises = list.map((arr) => {
    return limitP2.call(task, arr)
  })
  return Promise.all(promises)
}
