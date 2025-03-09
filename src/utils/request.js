import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "https://v3pz.itndedu.com/v3pz",
  timeout: 5000,
});

// 添加请求拦截器：添加header如token等
service.interceptors.request.use(
  function (config) {
    // 获取token
    const token = localStorage.getItem("pz_token");
    // 定义不需要添加token的API白名单
    const whiteList = ["/get/code", "/user/authentication", "/login"];

    // 如果token存在且当前请求不在白名单中，则添加token到请求头
    if (token && !whiteList.includes(config.url)) {
      config.headers["x-token"] = token;
    }

    return config;
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器：处理接口异常，非200的状态码
service.interceptors.response.use(
  function (response) {
    // 接口异常的时候给用户发送提示
    // response.data.code === -1 意味着无法获取到有效的HTTP响应状态码，比如网络断开，或者服务器宕机等
    // response.data.code === -1 是为了捕捉并处理那些尽管 HTTP 请求成功但应用层仍然认为是错误的情况
    if (response.data.code === -1) {
      ElMessage.warning(response.data.message);
    }
    if (response.data.code === -2) {
      localStorage.removeItem("pz_token");
      localStorage.removeItem("pz_userInfo");
      localStorage.removeItem("pz_v3pz"); // 这个数据是通过vuex-persistant插件存储的，需要手动清除
      // 清除token后，跳转到登录页面
      // 这里的window.location.href是为了重新加载页面，因为在登录页面的beforeRouteEnter守卫中，我们会判断是否有token，如果有token就会跳转到首页，所以需要重新加载页面，这样就会跳转到登录页面

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
