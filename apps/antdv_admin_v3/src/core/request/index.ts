import AppRequest from "./request";
import { isNil, isPlainObject } from "lodash-es";

const baseURL = import.meta.env.VITE_APP_BASE_API;
const request = new AppRequest({ baseURL });

export default request;

export const postForm = (url, data, config) => {
  if (isPlainObject(data)) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (!isNil(data[key])) {
        if (data[key] instanceof Blob) {
          formData.append(key, data[key]);
        } else if (typeof data === "object") {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]?.toString() || "");
        }
      }
    });

    return request.post(url, formData, config);
  } else {
    return Promise.reject(false);
  }
};

export const postFile = (url, data, progress = [], config) => {
  return postForm(
    url,
    data,
    Object.assign({}, config, {
      onUploadProgress: progress[0],
      onDownloadProgress: progress[1],
    })
  );
};

export const fetchBlob = (url, data, config) => {
  return request
    .post(
      url,
      data,
      Object.assign({}, config, {
        responseType: "blob",
      })
    )
    .then((blob) => {
      if (blob instanceof Blob) {
        return blob;
      } else {
        return Promise.reject(blob);
      }
    });
};
