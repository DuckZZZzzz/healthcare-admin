import request from "../utils/request";

// 发送验证码
export const getCode = (data) => {
  return request.post("/get/code", data);
};
// 验证码验证
export const checkCode = (data) => {
  return request.post("/user/authentication", data);
};
// 登录
export const login = (data) => {
  return request.post("/login", data);
};
