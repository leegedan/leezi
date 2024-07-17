import request from "@/core/request";

export function find(id) {
  return request.post("/dict/find", {
    id,
  });
}

export function search(parameter) {
  return request.post("/dict/list", parameter);
}
