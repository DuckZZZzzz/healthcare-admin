import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "https:/v3pz.itndedu.com/v3pz",
  timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("pz_token");
    // 不需要添加token的api
    const whiteList = ["/get/code", "/user/authentication", "/login"];
    if (token || whiteList.includes(config.url)) {
      // x-token是文档中要求的请求头的名称
      config.headers["x-token"] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 接口异常的时候给用户发送提示
    // response.data.code === -1 是为了捕捉并处理那些尽管 HTTP 请求成功但应用层仍然认为是错误的情况
    if (response.data.code === -1) {
      ElMessage.warning(response.data.message);
    }
    if (response.data.code === -2) {
      localStorage.removeItem("pz_token");
      localStorage.removeItem("pz_userInfo");
      localStorage.removeItem('pz_v3pz')
      // 获取当前页面的路由
      window.location.href = window.location.origin;
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
