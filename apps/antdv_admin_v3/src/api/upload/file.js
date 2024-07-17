import request from "@/core/request";

export function upload(parameter) {
  return request.post("/file/upload", parameter);
}

export function list(parameter) {
  return request.get("/file/list", parameter);
}

export function download(id, parameter) {
  return request.post("/file/download/" + id, parameter);
}
