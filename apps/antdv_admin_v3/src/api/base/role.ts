import request from "@/core/request";

export function search(parameter) {
  return request.post("/user/role/list", parameter);
}

export function save(parameter) {
  return request.post("/user/role/save", parameter);
}

export function del(parameter) {
  return request.post("/user/role/delete", parameter);
}
