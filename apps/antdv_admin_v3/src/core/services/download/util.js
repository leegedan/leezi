export function download(name, blob) {
  // const url = window.URL.createObjectURL(blob)
  // window.location.href = url
  const link = document.createElement('a')
  const URL = window.URL || window.webkitURL
  const href = URL.createObjectURL(blob)
  link.download = name
  link.href = href
  link.click()
  return true
}
