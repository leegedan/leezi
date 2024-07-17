import request from "@/core/request";

export function search(parameter) {
  return request.post("/menu/list", parameter);
}

export function save(parameter) {
  return request.post("/menu/save", parameter);
}

export function del(parameter) {
  return request.post("/menu/delete", parameter);
}
