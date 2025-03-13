import request from "../utils/request";

// 发送验证码
export const getCode = (data) => {
  return request.post("/get/code", data);
};
// 验证码验证
export const userAuthentication = (data) => {
  return request.post("/user/authentication", data);
};
// 登录
export const login = (data) => {
  return request.post("/login", data);
};

// 权限管理列表
export const authAdmin = (params) => {
  return request.get("/auth/admin", { params });
};

// 菜单权限数据
export const userGetMenu = () => {
  return request.get("/user/getmenu");
};

// 菜单权限修改
export const userSetMenu = (data) => {
  return request.post("/user/setmenu", data);
};

// 菜单权限列表
export const menuList = (params) => {
  return request.get("/menu/list", { params }); //如果 params 不是一个对象，则需要使用 { params: params } 形式来确保传入的是一个有效的对象字面量
};

// 权限下拉列表
export const menuSelectList = () => {
  return request.get("/menu/selectList");
};

// 用户数据修改: 函数起名最简单的方式就是把接口名称拼接一下
export const updataUser = (data) => {
  return request.post("/update/user", data);
};

// 用户菜单权限
export const menuPermissions = () => {
  return request.get("/menu/permissions");
};

// 陪诊师头像
export const photoList = () => {
  return request.get("/photo/list");
};

// 陪诊师创建
export const companion = (data) => {
  return request.post("/companion", data);
};

// 陪护列表
export const companionList = (params) => {
  return request.get("/companion/list", { params });
};
// 删除陪诊师
export const deleteCompanion = (data) => {
  return request.post("/delete/companion", data);
};

// 订单列表
export const adminOrder = (params) => {
  return request.get("/admin/order", {params});
}

// 服务状态完成
export const updateOrder = (data) => {
  return request.post("/update/order", data);
}

// 拿到控制台数据
export const getControlData = (params={}) => {
  return request.get('/report', { params })
}