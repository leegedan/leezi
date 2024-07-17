import request from "@/core/request";

export function save(parameter) {
  return request.post("/dept/save", parameter);
}

export function search(parameter) {
  return request.post("/dept/list", parameter);
}

export function del(parameter) {
  return request.post("/dept/delete", parameter);
}
