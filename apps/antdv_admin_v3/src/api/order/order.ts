import request from "@/core/request";

export function save(parameter) {
  return request.post("/order/save", parameter);
}

export function search(parameter) {
  return request.post("/order/list", parameter);
}

export function del(parameter) {
  return request.post("/order/delete", parameter);
}
