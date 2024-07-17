import request from "@/core/request";

export function save(parameter) {
  return request.post("/user/save", parameter);
}

export function search(parameter) {
  return request.post("/user/list", parameter);
}

export function del(parameter) {
  return request.post("/user/delete", parameter);
}
