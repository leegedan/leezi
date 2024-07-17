import { createAxios } from "./axios";
import type { Axios } from 'axios'

const defaultConfig = {
  // transformResponse: [], // 这个没什么用，在拦截器前执行，参数是原始response
  // withCredentials: true,
  timeout: 300000, // 请求超时时间
}

/**
 * 属于有点用又不是特别有用
 */
class AppRequest {
  axios: Axios
  constructor(axiosConfig) {
    this.axios = createAxios(Object.assign(defaultConfig, axiosConfig));
  }

  get(url, config = undefined) {
    return this.axios.get(url, config).then((response) => response.data);
  }

  post(url, data = {}, config = undefined) {
    return this.axios.post(url, data, config).then((response) => response.data);
  }

  // postForm(url, data, config) {
  //   if (isPlainObject(data)) {
  //     const formData = new FormData();
  //     Object.keys(data).forEach((key) => {
  //       if (!isNil(data[key])) {
  //         if (data[key] instanceof Blob) {
  //           formData.append(key, data[key]);
  //         } else if (typeof data === "object") {
  //           formData.append(key, JSON.stringify(data[key]));
  //         } else {
  //           formData.append(key, data[key]?.toString() || "");
  //         }
  //       }
  //     });

  //     return this.post(url, formData, config);
  //   } else {
  //     return Promise.reject(false);
  //   }
  // }

  // postFile(url, data, progress = [], config) {
  //   return this.postForm(
  //     url,
  //     data,
  //     Object.assign({}, config, {
  //       onUploadProgress: progress[0],
  //       onDownloadProgress: progress[1],
  //     })
  //   );
  // }

  // fetchBlob(url, data, config) {
  //   return this.post(
  //     url,
  //     data,
  //     Object.assign({}, config, {
  //       responseType: "blob",
  //     })
  //   ).then((response) => {
  //     const blob = response.data;
  //     if (blob instanceof Blob) {
  //       return blob;
  //     } else {
  //       return Promise.reject(blob);
  //     }
  //   });
  // }

  /**
   * 不常用
   */
  // delete(url, config) {
  //     return this.axios.delete(url, config).then(response => response.data)
  // }
  // head(url, config) {
  //     return this.axios.head(url, config).then(response => response.data)
  // }
  // options(url, config) {
  //     return this.axios.options(url, config).then(response => response.data)
  // }
  // put(url, data, config) {
  //     return this.axios.put(url, data, config).then(response => response.data)
  // }
  // patch(url, data, config) {
  //     return this.axios.patch(url, data, config).then(response => response.data)
  // }
}

export default AppRequest