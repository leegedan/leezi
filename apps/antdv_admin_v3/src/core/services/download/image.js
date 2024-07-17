import axios from 'axios'
import { download } from './util'

export function downloadImage(url, name) {
  return axios
    .get(url, {
      responseType: 'blob'
    })
    .then(stream => {
      const blob = new Blob([stream] /* { type: 'image/png' } */)
      return download(name, blob)
    })
}
