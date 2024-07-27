import request from "@/core/request";

export function login(parameter) {
  return request.post("/auth/login", parameter);
}

export function profile(parameter) {
  return request.post("/auth/profile", parameter);
}

export function permission(parameter) {
  return request.post("/auth/permission", parameter);
}

export function logout(token) {
  return request.post("/auth/logout", { token });
}

export function getSmsCaptcha() {}
